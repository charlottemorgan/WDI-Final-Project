from flask import Blueprint, request, jsonify
import requests
from models.recipe import Recipe, RecipeSchema
import os

api = Blueprint('recipes', __name__)

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True, exclude=('recipes',))

@api.route('/recipes', methods=['GET'])
def index():

    params = {
        'q': '',
        'app_id': os.getenv('EDAMAM_APP_ID'),
        'app_key': os.getenv('EDAMAM_APP_KEY'),
        'from': 0,
        'to': 30,
        'diet':  request.args.get('diet'),
        'health': request.args.get('health')
    }

    try:
        recipes = requests.get('https://api.edamam.com/search', params=params).json()
        return jsonify(recipes)

    # pylint: disable=W0703
    except Exception:
        return jsonify({'message':'No recipes found'}), 404




# @api.route('/recipes/<int:recipe_id>', methods=['GET'])
# def show(recipe_id):
