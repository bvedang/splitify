from flask import Flask, jsonify,request
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 
from flask_jwt_extended import JWTManager 
from flask_cors import CORS 
from flask_restful import Api 
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity,set_access_cookies


db = SQLAlchemy() 
migrate = Migrate() 
jwt = JWTManager() 
api = Api() 
cors = CORS()

def expired_token_callback(expired_token):
    token_type = expired_token['type']
    if token_type == 'access':
        refresh_token = request.cookies.get('refresh_token_cookie')
        if refresh_token:
            try:
                current_user_id = get_jwt_identity()
                access_token = create_access_token(identity=current_user_id)
                response = jsonify({'message': 'Access token refreshed'})
                set_access_cookies(response, access_token)
                return response, 200
            except:
                return jsonify({'message': 'Invalid refresh token'}), 401
    return jsonify({'message': 'Token has expired'}), 401


def create_app(config_class): 
    app = Flask(__name__) 
    app.config.from_object(config_class) 

    db.init_app(app) 
    migrate.init_app(app, db)
    jwt.init_app(app) 
    cors.init_app(app, resources={r"/*": {"origins": "*"}}) 

    jwt.expired_token_loader(expired_token_callback)

    return app