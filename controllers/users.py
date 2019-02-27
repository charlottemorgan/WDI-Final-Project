from flask import Blueprint, jsonify, request, g
from models.user import UserSchema, User

api = Blueprint('user', __name__)
user_schema = UserSchema()

@api.route('/users/<int:user_id>', methods=['GET'])
def show(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)
