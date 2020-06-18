from flask import Flask
import psycopg2 as pg2 

conn = pg2.connect(database='')
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
	print("Starting server.........")
	app.run(debug=True, use_reloader=True)