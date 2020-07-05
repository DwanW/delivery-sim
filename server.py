from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import psycopg2 as pg2
import jwt
import atexit
import uuid
import psycopg2.extras
from werkzeug.security import generate_password_hash, check_password_hash,safe_str_cmp
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'camel2020'
# initialize db connection
secret = '123'
conn = pg2.connect(database='camel', user='postgres',password=secret)
cur = conn.cursor()
psycopg2.extras.register_uuid()

cur.execute('SELECT * FROM category')
category_data = cur.fetchall()
category_dict = {name:id for id, name in category_data}

def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None

		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		
		if not token:
			return jsonify({'message': 'Token is missing'}), 401
		
		try:
			data = jwt.decode(token, app.config['SECRET_KEY'])
			cur.execute(f"SELECT * FROM user_data WHERE user_data.userid = '{data['public_id']}'")
			current_user = cur.fetchone()
		except: 
			return jsonify({'message' : 'Token is invalid'}), 401
		
		return f(current_user, *args, **kwargs)

	return decorated

# convert menu list to dictionary(utility function)
def get_cuisine_menu(clist, dataDict):
	cuisineName = "Other"
	categoryID = dataDict[cuisineName]
	for cuisine in clist:
		if cuisine in dataDict:
			categoryID = dataDict[cuisine]
			cuisineName = cuisine
			break
	cur.execute(f'SELECT * FROM item WHERE item."CategoryID" = {categoryID}')
	item_data = cur.fetchall()
	return {"name":cuisineName,"ID":categoryID, "menu": [{
	"ItemID":ItemID,
	"CategoryID":CategoryID,
	"ItemName": ItemName,
	"Price":float(Price),
	"ImgUrl" : ImgUrl,
	"Description": Description
	} for ItemID, CategoryID, ItemName, Price, ImgUrl, Description in item_data]}

# mockdata gathering logic
@app.route('/getmenu', methods=['POST'])
def get_menu_list():
	req_json = request.get_json()

	menu = get_cuisine_menu(req_json,category_dict)
	return jsonify(menu), 200

# crud user table

# check if user token is valid
@app.route('/user', methods=['GET'])
def check_user_token():
	token = None

	if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		
	if not token:
			return jsonify({'message': 'Token is missing'}), 401
		
	try:
		data = jwt.decode(token, app.config['SECRET_KEY'])
		return jsonify({'message': 'Token is valid'}), 200
	except: 
		return jsonify({'message' : 'Token is invalid'}), 401

# create user with auth token
@app.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
	req_json = request.get_json()
	username = req_json['username']
	email = req_json['email']
	current_time = datetime.datetime.utcnow()
	hashed_password = generate_password_hash(req_json['password'], method='sha256')
	cur.execute("INSERT INTO user_data (userid, username, email, password, date_joined) VALUES (%s,%s,%s,%s,%s)", (uuid.uuid4(), username, email, hashed_password, current_time))
	conn.commit()
	return jsonify({"message":"successfully created user"})

@app.route('/user/<userid>', methods=['DELETE'])
# @token_required
def delete_user(current_user,userid):
	try:
		cur.execute(f"DELETE FROM user_data WHERE userid = '{userid}'")
		conn.commit()
		return jsonify({"message":"successfully deleted user"})
	except:
		return jsonify({"message":"user does not exist"})

# authentication
@app.route('/signin', methods=['GET'])
def sign_in_authentication():
	auth = request.authorization

	if not auth or not auth.username or not auth.password:
		return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required!!!"'})

	cur.execute(f"SELECT * FROM user_data WHERE user_data.username = '{auth.username}';")
	user = cur.fetchone()
	
	if not user:
		return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required!!!"'})

	if check_password_hash(user[3], auth.password):
		token = jwt.encode({'public_id':str(user[0]), 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'])
		return jsonify({'token': token.decode('UTF-8')})

	return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required!!!"'})

@app.route('/signup', methods=['POST'])
def sign_up_check():
	req_json = request.get_json()
	username = req_json['username']
	email = req_json['email']

	cur.execute(f"SELECT username FROM user_data WHERE username = '{username}'")
	exist_user = cur.fetchone()

	if exist_user:
		return jsonify({"message": "sign up failed, please try a different username"})
	current_time = datetime.datetime.utcnow()
	hashed_password = generate_password_hash(req_json['password'], method='sha256')
	cur.execute("INSERT INTO user_data (userid, username, email, password, date_joined) VALUES (%s,%s,%s,%s,%s)", (uuid.uuid4(), username, email, hashed_password, current_time))
	conn.commit()
	return jsonify({"message":"successfully created user"})


# invoice operation (utility function)
def convert_schedule_to_string(schedule):
	if type(schedule) == str :
		return schedule
	else:
		initial_schedule = ['0','0','0','0','0','0','0']
		idx = 0
		for day in schedule:
			arr = schedule[day]
			if arr[0] == 1 and arr[1] == 1:
				initial_schedule[idx] = '3'
				idx+=1
			elif arr[0] == 1:
				initial_schedule[idx] = '1'
				idx+=1
			elif arr[1] == 1:
				initial_schedule[idx] = '2'
				idx+=1
			else:
				idx+=1

		return "".join(initial_schedule)

# create invoice record on checkout
@app.route('/checkout', methods=['POST'])
@token_required
def process_check_out(current_user):
	req_json = request.get_json()
	cartItems = req_json['cartItems']
	deliveryInfo = req_json['deliveryInfo']

	current_user_id = current_user[0]
	invoiceId = uuid.uuid4()
	current_time = datetime.datetime.utcnow()
	schedule = convert_schedule_to_string(deliveryInfo['schedule'])
	try:
		for item in cartItems:
			item_id = item['ItemID']
			quantity = item['quantity']
			line_id = uuid.uuid4()
			cur.execute("INSERT INTO invoice_list (line_id, item_id, invoice_id, quantity) VALUES (%s,%s,%s,%s)", (line_id, item_id, invoiceId, quantity))
		cur.execute("INSERT INTO invoice (invoice_id, customer_id, date_issued, schedule, delivery_address) VALUES (%s,%s,%s,%s,%s)", (invoiceId, current_user_id, current_time, schedule, deliveryInfo['address']))
		conn.commit()
		return jsonify({'message' : "Checkout complete, invoice created"}), 200
	except:
		return jsonify({'message' : 'an error has occurred'}), 500

# convert invoice list to dictionary (utility function)
def convert_invoice_list_to_dict(invoice_list):
	invoice_dict = {}
	for invoice_line in invoice_list:
		invoice
	pass
# get invoices for a specific user
@app.route('/userinvoice', methods=['GET'])
@token_required
def get_all_invoice(current_user):
	current_user_id = current_user[0]
	print(current_user_id)
	# try:
	sql = f'SELECT invoice.invoice_id, invoice.date_issued, invoice.schedule, invoice.delivery_address, invoice_list.quantity, item."ItemName", item."Price", item."Description" FROM invoice JOIN invoice_list ON invoice.invoice_id = invoice_list.invoice_id JOIN item on invoice_list.item_id = item."ItemID" WHERE customer_id = \'{current_user_id}\';'
	cur.execute(sql)
	invoice_list = cur.fetchall()
	print(invoice_list)
	return jsonify("it worked"), 200
	# except:
	# 	return jsonify({'message' : 'an error has occurred'}), 500


# utility route for deleting invoice by its uuid
@app.route('/invoice', methods=['DELETE'])
def delete_invoice_record():
	req_json = request.get_json()
	invoice_id = req_json['invoice_id']
	try:
		cur.execute(f"DELETE FROM invoice WHERE invoice_id = '{invoice_id}'")
		cur.execute(f"DELETE FROM invoice_list WHERE invoice_id = '{invoice_id}'")
		conn.commit()
		return jsonify({'message' : 'invoice and its related record has been deleted successfully'}), 200
	except:
		return jsonify({'message' : 'invoice and its related record has been deleted successfully'}), 500

@atexit.register
def close_db_connection():
	cur.close()
	conn.close()

if __name__ == '__main__':
	print("Starting server.........")
	app.run(debug=True, use_reloader=True)