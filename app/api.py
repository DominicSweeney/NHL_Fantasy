import sqlite3
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

# Initialize the Flask app
api = Flask(__name__)

# Configure the Flask app
api.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///users.db"  # SQLite database
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(api)

# User table for the database
class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    last_login = db.Column(db.DateTime, default=datetime, onupdate=datetime)
    player_rank = db.Column(db.String(50), nullable=False, default="Bronze")
    total_games_played = db.Column(db.Integer, nullable=False, default=0)
    wins = db.Column(db.Integer, nullable=False, default=0)
    losses = db.Column(db.Integer, nullable=False, default=0)
    win_rate = db.Column(db.Float, nullable=False, default=0.0)

    def update_stats(self):
        """Recalculate win rate and update rank based on wins."""
        if self.total_games_played > 0:
            self.win_rate = round((self.wins / self.total_games_played) * 100, 2)
        else:
            self.win_rate = 0.0
        
        # Rank update logic based on win count
        if self.wins >= 50:
            self.player_rank = "Prestige"
        elif self.wins >= 40:
            self.player_rank = "Diamond"
        elif self.wins >= 30:
            self.player_rank = "Platinum"
        elif self.wins >= 20:
            self.player_rank = "Gold"
        elif self.wins >= 10:
            self.player_rank = "Silver"
        else:
            self.player_rank = "Bronze"
        
        db.session.commit()

# Connect to the database
c = sqlite3.connect('users.db')
if c:
    print("Connected")

cursor = c.cursor()

# Execute the query
cursor.execute("SELECT * FROM user")

# Fetch all rows
rows = cursor.fetchall()

# Iterate over each row and print it
for row in rows:
    print(row)

# Close the connection
c.close()