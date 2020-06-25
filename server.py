from flask import Flask, jsonify, request, make_response
import psycopg2 as pg2
import jwt
import atexit
import uuid
from werkzeug.security import generate_password_hash, check_password_hash,safe_str_cmp
import datetime
from functools import wraps

# What the server does for this application:
# giving invoice ID: grab invoice information from each table and put data in a dictionary
# for sign in, sending username and hashed password: find if credential matches, if true return authenticated, else failed to authenticate
# for sign up, sending username and hashed password: find if username exist, if true return failed to sign up, else write to database user table
# Done :) giving category list, if match to category table exist return items as a dictionaries inside list, else return the category other
# giving item ID,
app = Flask(__name__)

app.config['SECRET_KEY'] = 'camel2020'
# initialize db connection
secret = '123'
conn = pg2.connect(database='camel', user='postgres',password=secret)
cur = conn.cursor()

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
		
		# try:
		# 	data = jwt.decode(token, app.config['SECRET_KEY'])
		# 	cur.execute(f"SELECT * FROM user_data WHERE user_data.username = '{data.username}'")
		# 	current_user = 

@app.route('/')
def hello_world():
    return jsonify('Hello, World!'),200

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

@app.route('/user', methods=['POST'])
def create_user():
	req_json = request.get_json()
	username = req_json['username']
	current_time = datetime.datetime.utcnow()
	hashed_password = generate_password_hash(req_json['password'], method='sha256')
	insert_sql = f"INSERT INTO user_data (username, password, date_joined) VALUES ('{username}', '{hashed_password}', '{current_time}');"
	cur.execute(insert_sql)
	conn.commit()
	return jsonify({"message":"success created user"})

# authentication
@app.route('/signin', methods=['POST'])
def sign_in_authentication():
	auth = request.authorization

	if not auth or not auth.username or not auth.password:
		return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required!!!"'})

	cur.execute(f"SELECT * FROM user_data WHERE user_data.username = '{auth.username}'")
	user = cur.fetchone()
	print(user[2])
	if not user:
		return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required!!!"'})
	if check_password_hash(user[2], auth.password):
		token = jwt.encode({'public_id':user[0], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

		return jsonify({'token': token.decode('UTF-8')})
	
	return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required!!!"'})

@app.route('/signup', methods=['POST'])
def sign_up_check():
	req_json = request.get_json()
	return '123'

@app.route('/signout', methods=['GET'])
def sign_out():
	pass

@atexit.register
def close_db_connection():
	cur.close()
	conn.close()

if __name__ == '__main__':
	print("Starting server.........")
	app.run(debug=True, use_reloader=True)