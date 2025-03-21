from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Point to the same SQLite file you use in DataGrip
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Example Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    Password = db.Column(db.String(80), unique=True, nullable=False)
    fav_team = db.Column(db.String(80), unique=True, nullable=False)

def create_tables():
    with app.app_context():
        db.create_all()

create_tables()

@app.route("/")
def index():
    return render_template("index.html")

#temp to check DELETE
@app.route("/test")
def test():
    users=User.query.all()
    for user in users:
        print(user.username)
    return render_template("test.html", users=users)

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/howToPlay")
def how_to_play():
    return render_template("howToPlay.html")

@app.route("/VsComputer")
def vs_computer():
    return render_template("VsComputer.html")

@app.route("/pickUpCard")
def pick_up_card():
    return render_template("pickUpCard.html")

@app.route("/register")
def register():
    return render_template("register.html")

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

# @app.route('/')
# def index():
#     users = User.query.all()
#     return f"Users: {[user.username for user in users]}"

if __name__ == '__main__':
    app.run(debug=True)
