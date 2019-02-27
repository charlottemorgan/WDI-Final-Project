from app import db, ma
from .base import BaseModel, BaseSchema

class Recipe(db.Model, BaseModel):

    __tablename__ = 'recipes'

    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    method = db.Column(db.String(1000), nullable=False)
    time = db.Column(db.Integer, nullable=False)

class RecipeSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Recipe
