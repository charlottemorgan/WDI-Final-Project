from app import app, db
from models.user import User, UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    
