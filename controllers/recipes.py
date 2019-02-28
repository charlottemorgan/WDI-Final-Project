from flask import Blueprint, request, jsonify, g
import requests
from models.recipe import Recipe, RecipeSchema
import os

api = Blueprint('recipes', __name__)

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True, exclude=('recipes',))

@api.route('/recipes', methods=['GET'])
def index():
    recipes = requests.get(
    # pylint: disable=C0301
    'https://api.edamam.com/search?q=&app_id=bdd717ce&app_key=075f9092a26b6944bfecae528bcc34e4&from=0&to=3&diet=&health=').json()
    # get user preferences from db
    # filter recipes according to preferences
    # return filtered list
    return jsonify(recipes)

# @api.route('/recipes/<int:recipe_id>', methods=['GET'])
# def show(recipe_id):
    recipe = requests.get(f'https://api.edamam.com/search?q=chicken&app_id=bdd717ce&app_key=075f9092a26b6944bfecae528bcc34e4&from=0&to=3/{recipe_id}').json()
    #
    # recipe = Recipe(**response)
    # recipe.save()
    #
    # return jsonify(recipe)
