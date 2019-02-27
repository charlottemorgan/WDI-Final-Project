from app import app, db
from models.user import User, UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    admin, errors = user_schema.load({
        'username': 'admin',
        'email': 'admin@admin.com',
        'password': 'admin123',
        'password_confirmation': 'admin123'
    })

    if errors:
        raise Exception(errors)

    db.session.add(admin)

    db.session.commit()
