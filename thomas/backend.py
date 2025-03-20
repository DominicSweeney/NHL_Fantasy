from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Point to the same SQLite file you use in DataGrip
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
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
