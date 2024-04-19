from splitifyApp import api
from splitifyApp.user.resources import SignupResource


def authapi():
    api.add_resource(SignupResource,'/auth/signup')