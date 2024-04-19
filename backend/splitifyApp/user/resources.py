from splitifyApp import db
from flask import request, jsonify,make_response
from splitifyApp.models import User
from flask_restful import Resource
from flask_jwt_extended import create_access_token, set_access_cookies
from werkzeug.security import generate_password_hash
from uuid import uuid4
from datetime import datetime


class SignupResource(Resource):
    def post(self):
        email = request.json.get("email")
        password = request.json.get("password")
        firstName = request.json.get("firstName")
        lastName = request.json.get("lastName")
        if not email or not password:
            response = make_response({'message': 'Email and password are required'})
            response.status_code = 400
            return response
        
        user = User.query.filter_by(email=email).first()
        if user:
            response = make_response({'message':'Account already Exists'})
            response.status_code = 409
            return response
        
        newUser = User(email=email, firstName=firstName, lastName=lastName, password=password)
        db.session.add(newUser)
        db.session.commit()
        accessToken = create_access_token(identity=newUser.id)
        response = jsonify({'message':'Account Created successfully'})
        response.status_code = 201
        set_access_cookies(response,accessToken)
        return response

        
        
        
