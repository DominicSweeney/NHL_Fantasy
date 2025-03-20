from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/howToPlay")
def how_to_play():
    return render_template("howToPlay.html")

@app.route("/VsComputer")
def vs_computer():
    return render_template("VsComputer.html")

# @app.route('/adminHome')
# def admin_home():
#     return render_template('adminHome.html')

# @app.route("/recent-activities")
# def recent_activities():
#     cursor = db.cursor(dictionary=True)
#     cursor.execute("SELECT description FROM recent_activities ORDER BY created_at DESC LIMIT 5")  
#     data = cursor.fetchall()
#     cursor.close()
#     return jsonify(data)


# Point to the same SQLite file you use in DataGrip
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///NHLfantasy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Example Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

@app.route('/')
def index():
    users = User.query.all()
    return f"Users: {[user.username for user in users]}"

if __name__ == '__main__':
    app.run(debug=True)
