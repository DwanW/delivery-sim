from flask import Flask, jsonify, request
import psycopg2 as pg2
import atexit

# What the server does for this application:
# giving invoice ID: grab invoice information from each table and put data in a dictionary
# for sign in, giving username and hashed password: find if credential matches, if true return authenticated, else failed to authenticate
# for sign up, giving username and hashed password: find if username exist, if true return failed to sign up, else write to database user table
# Done :) giving category list, if match to category table exist return items as a dictionaries inside list, else return the category other
# giving item ID,
app = Flask(__name__)

# initialize db connection
secret = '123'
conn = pg2.connect(database='camel', user='postgres',password=secret)
cur = conn.cursor()

cur.execute('SELECT * FROM category')
category_data = cur.fetchall()
category_dict = {name:id for id, name in category_data}

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
	return {"name":cuisineName,"ID":categoryID, "menu": [{"ItemID":ItemID, "CategoryID":CategoryID, "ItemName": ItemName, "Price":float(Price), "ImgUrl" : ImgUrl, "Description": Description} for ItemID, CategoryID, ItemName, Price, ImgUrl, Description in item_data]}

# mockdata gathering logic
@app.route('/getmenu', methods=['POST'])
def get_menu_list():
	req_json = request.get_json();

	menu = get_cuisine_menu(req_json,category_dict)
	return jsonify(menu), 200

@atexit.register
def close_db_connection():
	cur.close()
	conn.close()

if __name__ == '__main__':
	print("Starting server.........")
	app.run(debug=True, use_reloader=True)