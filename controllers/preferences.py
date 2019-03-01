from flask import Blueprint
from models.preference import Preference, PreferenceSchema

preferences_schema = PreferenceSchema(many=True)

api = Blueprint('preferences', __name__)

@api.route('/preferences', methods=['GET'])
def preferences_index():
    preferences = Preference.query.all()
    return preferences_schema.jsonify(preferences)
