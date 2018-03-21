from flask import render_template
from . import create_app

from flask_restful import Api
from .api import Stats


_app = create_app()
_api = Api(_app)

_api.add_resource(Stats, '/api/stats/<string:url>')


@_app.route("/")
def index():
    return render_template('index.html')
