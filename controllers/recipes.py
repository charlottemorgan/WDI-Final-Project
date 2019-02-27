from flask import Blueprint, request, jsonify, g
from models.recipe import Recipe, RecipeSchema

api = Blueprint('recipes', __name__)

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True, exclude=('recipes',))

@api.route('/recipes', methods=['GET'])
def index():
    recipes = Recipe.query.all()
    return recipes_schema.jsonify(recipes)

@api.route('/recipes/<int:recipe_id>', methods=['GET'])
def show(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    return recipe_schema.jsonify(recipe)
