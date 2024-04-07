from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 
from flask_jwt_extended import JWTManager 
from flask_cors import CORS 
from flask_restful import Api 


db = SQLAlchemy() 
migrate = Migrate() 
jwt = JWTManager() 
api = Api() 
cors = CORS()
def create_app(config_class): 
    app = Flask(__name__) 
    app.config.from_object(config_class) 

    db.init_app(app) 
    migrate.init_app(app, db)
    jwt.init_app(app) 
    cors.init_app(app, resources={r"/*": {"origins": "*"}}) 
    api.init_app(app) 

    return app