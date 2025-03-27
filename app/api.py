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

@api.route('/update_stats', methods=['POST'])
@login_required
def update_stats():
    data = request.get_json()
    if not data or 'result' not in data:
        return jsonify({"error": "Invalid request"}), 400

    result = data['result']
    user = User.query.get(current_user.id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.total_games_played += 1
    if result == 'win':
        user.wins += 1
    elif result == 'loss':
        user.losses += 1
    else:
        return jsonify({"error": "Invalid result type"}), 400

    user.update_stats()

    user.update_stats()
    return jsonify({"message": "Stats updated successfully", "win_rate": user.win_rate, "rank": user.player_rank})
