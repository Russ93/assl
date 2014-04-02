# Russell Schlup
# Feb 27, 2014
# SSL

import time
from random import randint
from flask import Flask, request, session, flash, abort, redirect, url_for
import mysql.connector

app = Flask(__name__)
#db = MySQLdb.connect(host="localhost", user="root", passwd="root", db="blogah")


@app.route("/")
def index():
	cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='bloggah')
	cursor = cnx.cursor()
	query = ("SELECT * FROM messages;")
	cursor.execute(query)

	strang = '''
	<link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
	<nav class='col-md-12'>
		<a href='./create'><button class='btn btn-info'>Create a New Post</button></a>
	</nav>
	<ul>'''
	for (id, header, message, posted) in cursor:
		currObj = '''
		<li class='col-md-3'>
			<h4>{header}</h4>
			<time datetime='{posted}'>{posted}</time>
			<p>{message}</p>
			<a href='./update/{id}'>edit</a>
		</li>'''
		strang = strang+currObj.format(**locals())

	strang = strang+'''
	</ul>
	'''

	return strang
@app.route('/create')
def create():
	return '''
	<link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
	<form action='./post' class='col-md-4' method='post'>
		<label>Header: </label><input type='text' class='form-control' name='header' /><br />
		<label>Message: </label><textarea class='form-control' name='message'></textarea><br />
		<button class='btn btn-primary'>Submit</button>
	</form>
	'''
@app.route('/post',methods=['POST'])
def post():
	cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='bloggah')
	cursor = cnx.cursor()

	# create the SQLstatement
	sql = ("INSERT INTO messages (header, message, posted) VALUES (%s,%s,now())")
	# Bind params
	params = (request.form['header'],request.form['message'])
	# execute the bound parameters
	cursor.execute(sql,params)
	# commits the changes
	cnx.commit()
	# redirects you to the home page
	return redirect('/')

@app.route('/update/<id>',methods=['GET'])
def update(id):
	cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='bloggah')
	cursor = cnx.cursor()
	query = ("select id, header, message from messages where id = "+id)
	cursor.execute(query)
	for (id, header, message) in cursor:
		strang = '''
	<link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
	<form action='/change/{id}' class='col-md-4' method='post'>
		<label>Header: </label><input type='text' class='form-control' name='header' value='{header}' /><br />
		<label>Message: </label><textarea  class='form-control' name='message'>{message}</textarea><br />
		<a href='/remove/{id}'>delete</a>
		<button class='btn btn-primary'>Submit</button>
	</form>
	'''
		strang = strang.format(**locals())
	return strang

@app.route('/change/<id>',methods=['POST'])
def change(id):
	cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='bloggah')
	cursor = cnx.cursor()

	# create the SQLstatement
	sql = ("UPDATE messages SET header = %s, message = %s, posted = now() where id = %s;")
	# Bind params
	params = (request.form['header'],request.form['message'], id)
	# execute the bound parameters
	cursor.execute(sql,params)
	# commits the changes
	cnx.commit()
	# redirects you to the home page
	return redirect('/')

@app.route('/remove/<id>',methods=['GET'])
def remove(id):
	cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='bloggah')
	cursor = cnx.cursor()

	# create the SQLstatement
	sql = ("DELETE FROM messages WHERE id = "+id)
	# execute the bound parameters
	cursor.execute(sql)
	# commits the changes
	cnx.commit()
	# redirects you to the home page
	return redirect('/')

if __name__ == '__main__':
	#set the secret key. Can be any unique value
	app.secret_key = 'zxcvbnm9'
	app.run(debug=True)