#Using mysql.connector from a MAC
import mysql.connector

cnx = mysql.connector.connect(user='root',password='root',host='127.0.0.1',port=8889,database='BDF')

cursor = cnx.cursor()
query = ("SELECT username, password, DOB FROM users")

cursor.execute(query)
for (username, password, DOB) in cursor:
  print("{}, {} was born on {}".format(
    username, password, DOB))

cursor.close()
cnx.close()


add_stuff = ("INSERT INTO table"
	"(thing_1, thing_2)"
	"VALUES (%s,%s)")
data_stuff = ('thing_1','thing_2')