from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# App Configuration
app.config['SECRET_KEY'] = 'your_secret_key'  # You should change this to a secret key
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///database1.db"  # Your existing SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database and login manager
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Set the default login route for Flask-Login

# Example Model - User model for the database
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Initialize the database (if it doesn't exist already)
def create_tables():
    with app.app_context():
        db.create_all()

create_tables()

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes

@app.route("/")
def index():
    return render_template("index.html")

# Temporary route to check DELETE
@app.route("/test")
def test():
    users = User.query.all()
    for user in users:
        print(user.username)
    return render_template("test.html", users=users)

@app.route("/home")
@login_required
def home():
    # Render the home.html template and pass the username and email to it
    return render_template("home.html", username=current_user.username)

@app.route("/howToPlay")
def how_to_play():
    return render_template("howToPlay.html")

@app.route("/VsComputer")
def vs_computer():
    return render_template("VsComputer.html")

@app.route("/pickUpCard")
def pick_up_card():
    return render_template("pickUpCard.html")

@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        # Check if the username or email already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash("Username already taken", 'danger')
            return redirect(url_for('register'))
        
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            flash("Email already registered", 'danger')
            return redirect(url_for('register'))

        # Hash password
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        new_user = User(username=username, password=hashed_password, email=email)

        db.session.add(new_user)
        db.session.commit()

        flash("Registration successful!", 'success')
        return redirect(url_for('index'))
    return render_template("register.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('home'))

        flash('Invalid username or password', 'danger')
    return render_template("index.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

# Main entry point for running the app
if __name__ == '__main__':
    app.run(debug=True)
