from flask import Blueprint, jsonify, request, g
from lib.secure_route import secure_route
from models.user import UserSchema, User

api = Blueprint('auth', __name__)
user_schema = UserSchema()

@api.route('/register', methods=['POST'])
def register():

    user, errors = user_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    user.save()

    return jsonify({'message': 'Registration successful'}), 201


@api.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if not user or not user.validate_password(data.get('password', '')):
        return jsonify({'message': 'Unauthorized'}), 401

    return jsonify({
        'message': 'Welcome back {}!'.format(user.username),
        'token': user.generate_token()
    })


@api.route('/me', methods=['GET'])
@secure_route
def me():

    return user_schema.jsonify(g.current_user)
