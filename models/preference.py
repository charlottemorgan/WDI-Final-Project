from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Preference(db.Model, BaseModel):

    __tablename__ = 'preferences'

    diet = db.Column(db.String(80), nullable=False)


class PreferenceSchema(ma.ModelSchema, BaseSchema):

    users = fields.Nested('UserSchema', many=True, only=('id', 'username'))


    class Meta:
        model = Preference
