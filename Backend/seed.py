from app import db, User, Caterer, Meal

def seed_data():
    # Check if the user already exists
    existing_user = User.query.filter_by(username='testuser3').first()
    if existing_user is None:
        # If user doesn't exist, add a user
        user = User(username='testuser3', password='testpass3', email='test3@example.com')
        db.session.add(user)
        db.session.commit()

        # Add a caterer
        caterer = Caterer(user_id=user.id, name="test caterer")
        db.session.add(caterer)
        db.session.commit()

        # Add a meal
        meal = Meal(caterer_id=caterer.id, name="test meal", price=10.99)
        db.session.add(meal)
        db.session.commit()
    else:
        print("User 'testuser' already exists. Skipping seed.")

if __name__ == "__main__":
    db.create_all()
    seed_data()
