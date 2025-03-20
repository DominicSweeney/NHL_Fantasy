from flask import Flask, render_template, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL Database Connection
db = mysql.connector.connect(
    host="localhost",  # Change if using a remote DB
    user="root",       # Default MySQL username
    password="",       # Default is empty for local MySQL
    database="your_database_name"
)

@app.route('/adminHome')
def admin_home():
    return render_template('adminHome.html')

@app.route("/recent-activities")
def recent_activities():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT description FROM recent_activities ORDER BY created_at DESC LIMIT 5")  
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)