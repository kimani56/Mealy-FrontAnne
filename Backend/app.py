from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity
from datetime import date

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://beliya470:Jelly360@localhost/beliya470'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'super_secret_key'
app.config['JWT_SECRET_KEY'] = 'jwt_secret_key'

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(50), default='customer')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

class Caterer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    star_meal = db.Column(db.Integer, db.ForeignKey('meal.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caterer_id = db.Column(db.Integer, db.ForeignKey('caterer.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caterer_id = db.Column(db.Integer, db.ForeignKey('caterer.id'), nullable=False)
    day = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MenuMeals(db.Model):
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meal.id'), primary_key=True)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey('meal.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

@app.route('/')
def index():
    return "Welcome to my Flask application!"


@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate incoming data
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({"message": "Incomplete registration data!"}), 400

    # Optional: validate the role
    if 'role' in data and data['role'] not in ['admin', 'customer', 'caterer']:
        return jsonify({"message": "Invalid role specified!"}), 400

    hashed_password = generate_password_hash(data['password'], method='sha256')

    # Check if the user already exists
    existing_user = User.query.filter_by(username=data['username']).first()

    if existing_user:
        return jsonify({"error": "username_taken", "message": "Username already taken!"}), 409

    role = data.get('role', 'customer')  # default to 'customer' if role is not provided
    new_user = User(username=data['username'], password=hashed_password, email=data['email'], role=role)
    db.session.add(new_user)
    db.session.commit()

    # If the role is 'caterer', create a corresponding Caterer record
    if role == 'caterer':
        new_caterer = Caterer(user_id=new_user.id, name=data['username'])
        db.session.add(new_caterer)
        db.session.commit()

    return jsonify({"message": f"User registered successfully as a {role}!"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate incoming data
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Incomplete login data!"}), 400

    # Query user from the database
    user = User.query.filter_by(email=data['email']).first()

    # Validate credentials
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials!"}), 401

    # If credentials are valid, create access token
    access_token = create_access_token(identity=user.id)

    # Return access token along with user ID and name
    return jsonify({"access_token": access_token, "isAuthenticated": True, "user_id": user.id, "name": user.username}), 200


@app.route('/meals', methods=['POST'])
@jwt_required
def add_meal():
    current_user_id = get_jwt_identity()
    caterer = Caterer.query.filter_by(user_id=current_user_id).first()

    if not caterer:
        return jsonify({"message": "Unauthorized action!"}), 403
       


    data = request.get_json()

    if not data or not data.get('name') or not data.get('price'):
        return jsonify({"message": "Incomplete meal data!"}), 400

    new_meal = Meal(caterer_id=caterer.id, name=data['name'], description=data.get('description', ''), price=data['price'], image_url=data.get('image_url', ''))
    db.session.add(new_meal)
    db.session.commit()

    return jsonify({"message": "Meal added successfully!"}), 201

@app.route('/meals', methods=['GET'])
def get_meals():
    user_id = request.args.get('user_id')
    if not user_id:
        # Return a 422 response if user_id is not provided
        return jsonify({"error": "User ID is required"}), 422
    
    # Perform server-side validation, for example, check if user_id is valid
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid User ID"}), 422
    
    # Fetch meals from database or other data source
    meals = get_meals_from_db(user_id)
    if not meals:
        return jsonify({"error": "No meals found for the given user ID"}), 422
    
    # Return meals data
    return jsonify({"meals": meals}), 200

def get_meals_from_db(user_id):
    caterer = Caterer.query.filter_by(user_id=user_id).first()
    if not caterer:
        return None
    meals = Meal.query.filter_by(caterer_id=caterer.id).all()
    return [{"id": meal.id, "name": meal.name, "description": meal.description, "price": meal.price, "image_url": meal.image_url} for meal in meals]


# @app.route('/meals', methods=['GET'])
# def get_all_meals():
#     try:
#         # Try getting the user ID from the session or some other method
#         current_user_id = session.get('user_id')

#         # Check if a user ID is found
#         if not current_user_id:
#             return jsonify({"error": "User not logged in"}), 401

#         caterer = Caterer.query.filter_by(user_id=current_user_id).first()

#         # Check if caterer is found
#         if not caterer:
#             return jsonify({"message": "Caterer not found!"}), 404

#         meals = Meal.query.filter_by(caterer_id=caterer.id).all()
#         meals_data = [{"id": meal.id, "name": meal.name, "description": meal.description, "price": meal.price, "image_url": meal.image_url} for meal in meals]

#         return jsonify({"meals": meals_data}), 200
#     except Exception as e:
#         # Log the error for debugging
#         app.logger.error(f"Error fetching meals: {str(e)}")
#         return jsonify({"error": "An error occurred while processing the request."}), 422

# @app.route('/meals', methods=['GET'])
# def get_all_meals():
#     try:
#         # Replace with the actual user_id you just inserted.
#         sample_user_id = 15
#         caterer = Caterer.query.filter_by(user_id=sample_user_id).first()

#         # Check if caterer is found
#         if not caterer:
#             return jsonify({"message": "Caterer not found!"}), 404

#         meals = Meal.query.filter_by(caterer_id=caterer.id).all()
#         meals_data = [{"id": meal.id, "name": meal.name, "description": meal.description, "price": meal.price, "image_url": meal.image_url} for meal in meals]

#         return jsonify({"meals": meals_data}), 200
#     except Exception as e:
#         # Log the error for debugging
#         app.logger.error(f"Error fetching meals: {str(e)}")
#         return jsonify({"error": "An error occurred while processing the request."}), 422


@app.route('/meals/<int:meal_id>', methods=['PUT', 'DELETE'])
@jwt_required
def modify_meal(meal_id):
    current_user_id = get_jwt_identity()
    caterer = Caterer.query.filter_by(user_id=current_user_id).first()

    if not caterer:
        return jsonify({"message": "Unauthorized action!"}), 403

    meal = Meal.query.filter_by(id=meal_id, caterer_id=caterer.id).first()

    if not meal:
        return jsonify({"message": "Meal not found!"}), 404

    if request.method == 'PUT':
        data = request.get_json()

        if data:
            meal.name = data.get('name', meal.name)
            meal.description = data.get('description', meal.description)
            meal.price = data.get('price', meal.price)
            meal.image_url = data.get('image_url', meal.image_url)
            db.session.commit()
            return jsonify({"message": "Meal updated successfully!"}), 200

        return jsonify({"message": "Invalid data!"}), 400

    elif request.method == 'DELETE':
        db.session.delete(meal)
        db.session.commit()
        return jsonify({"message": "Meal deleted successfully!"}), 200


@app.route('/menu', methods=['POST'])
@jwt_required
def set_menu():
    data = request.json
    caterer_id = data['caterer_id']
    meals = data['meals']

    today_menu = Menu(caterer_id=caterer_id, day=date.today())
    db.session.add(today_menu)
    db.session.commit()

    for meal_id in meals:
        menu_meal = MenuMeals(menu_id=today_menu.id, meal_id=meal_id)
        db.session.add(menu_meal)
    db.session.commit()

    return jsonify({"message": "Menu set successfully!"})

@app.route('/menu', methods=['GET'])
@jwt_required
def get_today_menu():
    caterer_id = request.args.get('caterer_id')
    menu = Menu.query.filter_by(caterer_id=caterer_id, day=date.today()).first()
    meals = [meal_meal.meal for meal_meal in menu.menu_meals]

    return jsonify({"menu": [meal.name for meal in meals]})

@app.route('/order', methods=['POST'])
@jwt_required
def place_order():
    data = request.json
    user_id = data['user_id']
    meal_id = data['meal_id']
    quantity = data['quantity']

    meal = Meal.query.get(meal_id)
    total_amount = meal.price * quantity

    order = Order(user_id=user_id, meal_id=meal_id, quantity=quantity, total_amount=total_amount)
    db.session.add(order)
    db.session.commit()

    return jsonify({"message": "Order placed successfully!"})

@app.route('/order', methods=['GET', 'PUT'])
@jwt_required
def get_or_modify_order():
    if request.method == 'GET':
        order_id = request.args.get('order_id')
        order = Order.query.get(order_id)
        return jsonify({"order": {"meal_id": order.meal_id, "quantity": order.quantity, "total_amount": order.total_amount}})
    
    elif request.method == 'PUT':
        data = request.json
        order_id = data['order_id']
        new_meal_id = data['meal_id']
        new_quantity = data['quantity']

        order = Order.query.get(order_id)
        meal = Meal.query.get(new_meal_id)
        order.meal_id = new_meal_id
        order.quantity = new_quantity
        order.total_amount = meal.price * new_quantity
        db.session.commit()

        return jsonify({"message": "Order updated successfully!"})

@app.route('/orders', methods=['GET'])
@jwt_required
def get_all_orders():
    caterer_id = request.args.get('caterer_id')
    orders = Order.query.join(Meal, Order.meal_id == Meal.id).filter(Meal.caterer_id == caterer_id).all()
    return jsonify({"orders": [{"meal_id": order.meal_id, "quantity": order.quantity, "total_amount": order.total_amount} for order in orders]})

@app.route('/history', methods=['GET'])
@jwt_required
def get_order_history():
    user_id = request.args.get('user_id')
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify({"history": [{"meal_id": order.meal_id, "quantity": order.quantity, "total_amount": order.total_amount} for order in orders]})

@app.route('/notifications', methods=['GET'])
@jwt_required
def get_notifications():
    return jsonify({"notifications": ["Menu for today has been set!"]})

@app.route('/earnings', methods=['GET'])
@jwt_required
def get_earnings():
    caterer_id = request.args.get('caterer_id')
    orders = Order.query.join(Meal, Order.meal_id == Meal.id).filter(Meal.caterer_id == caterer_id).all()
    total_earnings = sum([order.total_amount for order in orders])
    return jsonify({"earnings": total_earnings})

if __name__ == "__main__":
    app.run(debug=True)
