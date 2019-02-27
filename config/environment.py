import os

secret = os.getenv('SECRET', 'shh, it\'s a secret')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/wdi-final-project')
