from flask import Blueprint, request, jsonify, g
import requests
from models.recipe import Recipe, RecipeSchema
import os

api = Blueprint('recipes', __name__)

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True, exclude=('recipes',))

@api.route('/recipes', methods=['GET'])
def index():

    diet = request.args.get('diet')
    # used to be request.args.get('diet') - we will now get it from the user database
    health = request.args.get('health')
    # used to be request.args.get('health') - we will now get it from the user


    params = {
        'q': '',
        'app_id': os.getenv('EDAMAM_APP_ID'),
        'app_key': os.getenv('EDAMAM_APP_KEY'),
        'from': 0,
        'to': 30,
        'diet':  diet,
        'health': health
    }
    print(params)

    try:
        recipes = requests.get('https://api.edamam.com/search', params=params).json()
        return jsonify(recipes)

    # pylint: disable=W0703
    except Exception:
        return jsonify({'message':'No recipes found'}), 404




# @api.route('/recipes/<int:recipe_id>', methods=['GET'])
# def show(recipe_id):
#     diet = request.args.get('diet')
#     # used to be request.args.get('diet') - we will now get it from the user database
#     health = request.args.get('health')
#     # used to be request.args.get('health') - we will now get it from the user
#
#
#     params = {
#         'q': '',
#         'app_id': os.getenv('EDAMAM_APP_ID'),
#         'app_key': os.getenv('EDAMAM_APP_KEY'),
#         'from': 0,
#         'to': 30,
#         'diet':  diet,
#         'health': health,
#         'recipe_id': recipe_id
#     }
#
#     try:
#         recipe = requests.get('https://api.edamam.com/search', params=params).json()
#         return jsonify(recipe)
#
#     # pylint: disable=W0703
#     except Exception:
#         return jsonify({'message':'No recipes found'}), 404
