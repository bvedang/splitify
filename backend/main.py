from splitifyApp import create_app
from splitifyApp.models import User
from config import DevelopmentConfig

app = create_app(DevelopmentConfig)



if __name__ == "__main__":
    app.run(debug=True)