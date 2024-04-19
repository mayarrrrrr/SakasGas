from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import db, User, Order, OrderItem, Product
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token,unset_jwt_cookies
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.json.compact = False

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = "b'\x03\xa3\x8c\xb3\n\xf4}\x16aFh\xc5'"

db.init_app(app)

migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


class UserRegister(Resource):
    @cross_origin()
    def post(self):
        email = request.json['email']
        username = request.json['username']
        password = str(request.json['password'])
        role = request.json['role']

        #print(f"Type of password: {type(password)}") 

        user_exists = User.query.filter_by(email=email).first()

        if user_exists:
            return jsonify({'error': 'User already exists'}), 409
        # if email exists, or passwords dont match, do something 
        #if password != confirm_password:
        #    return jsonify({'Error': 'Passwords not matching'})

        hashed_pw = bcrypt.generate_password_hash(password)
       # hashed_cpw = bcrypt.generate_password_hash(confirm_password)

        access_token = create_access_token(identity=email)

        new_user = User(
            email=email, 
            username = username, 
            password=hashed_pw,
            role=role
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username,
            "role": new_user.role,
            "access_token": access_token,
        }),201


class UserLogin(Resource):
    def post(self):
        email = request.json['email']
        password = request.json['password']

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({'error': 'Unauthorized'}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Unauthorized, incorrect password'}), 401
        
        access_token = create_access_token(identity=email)
        user.access_token = access_token


        return jsonify({
            "id": user.id,
            "email": user.email,
            "access_token": user.access_token, 
            "role" : user.role 
        })
    




class Logout(Resource):
    @jwt_required()
    def post(self):
        unset_jwt_cookies()
        return{"message":"Successfully logged out"} 


class Users(Resource):
    def get(self):
        users = [user.to_dict(only=('id', 'username', 'email', 'role', )) for user in User.query.all()]
        print("im a user", users)
        return make_response(jsonify(users),200)


class UserByID(Resource):

    def get(self,id):
        user = User.query.filter(User.id==id).first()

        if user:
            return make_response(jsonify(user.to_dict()),200) 

    def patch(self,id):

        data = request.get_json()

        user = User.query.filter(User.id==id).first()

        for attr in data:
            setattr(user,attr,data.get(attr))

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(),200)

    def delete(self,id):

        user = User.query.filter(User.id==id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response("",204)
        else:
            return make_response(jsonify({"error":"User not found"}),404) 

#  USER SIDE PRODUCTS

class Products(Resource):
        def get(self):
            products = [products.to_dict(only=('id', 'name', 'description', 'price', 'image_url','quantity_available','seller_id')) for products in Product.query.all()]
            return make_response(jsonify(products),200)
 

#  ORDERS

class Orders(Resource):

    @jwt_required()
    def get(self):
        orders = [order.to_dict(only=('id', 'total_price', 'status', 'user_id')) for order in Order.query.all()]
        return make_response(orders,200)

    @jwt_required()
    def post(self):

        data = request.json
        current_user_id = get_jwt_identity()

        try:
            new_order = Order(
                #quantity = data["quantity"],
                #user_id = data["user_id"],
                #product-id = data['product_id']
                user_id=current_user_id,
                total_price=data["total"],
                status="pending"
            )
            # incase of a list of items 
            for item in data["items"]:
                order_item = OrderItem(
                    product_id=item["id"],
                    quantity=item["quantity"]
                )
                new_order.order_items.append(order_item)

            db.session.add(new_order)
            db.session.commit()
            return make_response(new_order.to_dict(), 201)

        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400) 

        #except ValueError:
        #    return make_response(jsonify({"error":["validation errors"]}))
        
        #return make_response(new_order.to_dict(),201)
    
class Admin(Resource):
    def get(self):
        products = [product.to_dict(only=('id', 'name', 'description', 'price', 'image_url','quantity_available',)) for product in Product.query.all()]
        return make_response(products,200)
    
    def post(self):
        data = request.json

        new_product = Product(
            name = data["name"],
            price = data["price"],
            description = data["description"]
        )

        db.session.add(new_product)
        db.session.commit()

        return make_response(jsonify(new_product.to_dict()),200)
    
class AdminProductID(Resource):

    def patch(self,id):

        data = request.get_json()

        product = Product.query.filter(Product.id == id).first()

        for attr in data:

            setattr(product,attr,data.get(attr))   

        db.session.add(product)
        db.session.commit()

        return make_response(product.to_dict(),200)

    def delete(self,id):

        product = Product.query.filter(Product.id == id).first()

        if product:
            db.session.delete(product)
            db.session.add()
            return make_response("",204)
        
        else:
            return make_response(jsonify({"error":"product not found"}),404)




             

    

api.add_resource(UserRegister, '/userRegister')
api.add_resource(UserLogin, '/userLogin')
api.add_resource(Logout, "/userLogout")
api.add_resource(Users, "/users")
api.add_resource(UserByID, "/users/<int:id>")
api.add_resource(Products, "/products")
api.add_resource(Orders,"/orders")
api.add_resource(Admin,"/admin")
api.add_resource(AdminProductID,"/admin/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
