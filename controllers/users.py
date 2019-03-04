from flask import Blueprint, jsonify, request
import jwt
from lib.secure_route import secure_route
from models.user import UserSchema, User

api = Blueprint('user', __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@api.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return users_schema.jsonify(users)

@api.route('/users/<int:user_id>', methods=['GET'])
def show(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)

@api.route('/users/setpreferences', methods=['POST'])
def edit():
    print('REACHING HERE')

    # GET PREFERENCES AND SHAPE DATA
    diet = request.args.get('diet')
    health = request.args.get('health')
    print('DIET AND HEALTH', diet, health)
    diet_data = {'type': 'diet', 'value': diet}
    health_data = {'type': 'health', 'value': health}
    print('SHAPED DATA', diet_data, health_data)

    # get USER MAKING REQUEST
    user_token = request.headers.get('Authorization')
    print('TOKEN', user_token)
    decoded_token = jwt.decode(user_token)
    payload = decoded_token.payload
    user_username = payload.Username
    user = User.query.get(user_username)

    # SAVE DATA TO database

    user, errors = user_schema.load({'preference': [diet_data, health_data]}, instance=user)

    if errors:
        return jsonify(errors), 422

    user.save()


    return user_schema.jsonify(user)
