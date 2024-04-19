from splitifyApp import create_app
from splitifyApp.models import User
from config import DevelopmentConfig
from flask_restful import Api
from splitifyApp.user.resources import SignupResource

app = create_app(DevelopmentConfig)
api = Api(app)
api.add_resource(SignupResource,'/auth/signup')


if __name__ == "__main__":
    app.run(debug=True)