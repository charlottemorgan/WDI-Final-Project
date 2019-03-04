from app import db, ma
from .base import BaseModel, BaseSchema

class Item(db.Model, BaseModel):

    __tablename__ = 'items'

    name = db.Column(db.String(255), nullable=False)
    checked = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class ItemSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Item
