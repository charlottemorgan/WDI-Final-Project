from app import app, db
from models.user import User, UserSchema
from models.recipe import Recipe

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

    chorizo_carbonara = Recipe(
    name='Chorizo Carbonara',
    ingredients='chorizo, spaghetti, eggs, parmesan',
    method='fry the chorizo until crisp, cook the spaghetti, mix egg parmesan, serve',
    time=30
    )
    db.session.add(chorizo_carbonara)

    db.session.commit()
