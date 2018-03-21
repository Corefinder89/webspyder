from flask import Flask

from config import Config


def create_app(config_class=Config):

    _app = Flask(__name__)
    _app.config.from_object(config_class)

    return _app
