from app import db, User, Caterer, Meal # Make sure you adjust "your_app_name" to the actual name of your file or application module.

def seed_data():
    # Add a user
    user = User(username='testuser', password='testpass', email='test@example.com')
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

if __name__ == "__main__":
    db.create_all()
    seed_data()

