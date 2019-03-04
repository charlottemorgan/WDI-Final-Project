from app import app, db
from models.user import UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    admin, errors = user_schema.load({
        'username': 'admin',
        'email': 'admin@admin.com',
        'password': 'admin123',
        'password_confirmation': 'admin123',
        'list': [{
            'name': '200g chopped tomatoes',
        }, {
            'name': '500g minced beef'
        }]
    })

    if errors:
        raise Exception(errors)

    db.session.add(admin)

    # all_recipes = requests.get('https://api.github.com/events').json()
    # for each_recipe in all_recipes:
    #     print(each_recipe['actor']['id'])

        # print(each_recipe['strActor'] + ' ' + each_recipe['idActor']).json()
        # each_recipe.save()

    # print(all_recipes)

    # chorizo_carbonara = Recipe(
    # name='Chorizo Carbonara',
    # ingredients='chorizo, spaghetti, eggs, parmesan',
    # method='fry the chorizo until crisp, cook the spaghetti, mix egg parmesan, serve',
    # time=30
    # )
    # db.session.add(chorizo_carbonara)

    db.session.commit()
