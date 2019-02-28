import os

secret = os.getenv('SECRET', 'shh, it\'s a secret')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/wdi-final-project')
edamam_id = os.getenv('RECIPE_ID', 'bdd717ce')
edamam_key = os.getenv('RECIPE_KEY', '075f9092a26b6944bfecae528bcc34e4')
