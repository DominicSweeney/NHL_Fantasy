from app import app, db, User

def preload_drivers():
    """Preload the database with the 2025 F1 driver roster if empty."""
    with app.app_context():  # ✅ Ensure the database operations run inside an app context
        if User.query.count() == 0:  # Check if the database is empty
            users = [
                User(username="frank", Password="password", fav_team="toronto mapleleafs"),
                # ...add more users if needed...
            ]

            db.session.bulk_save_objects(users)
            db.session.commit()
            print("✅ Preloaded the database with F1 drivers.")
        else:
            print("⚠️ Database already contains data. No changes made.")

if __name__ == "__main__":
    with app.app_context(): 
        db.create_all()
        preload_drivers()