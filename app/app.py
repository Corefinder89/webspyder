from flask import render_template
from . import create_app

from flask_restful import Api
from .api import StatsAPI
from .api import ExportAPI


_app = create_app()
_api = Api(_app)

_api.add_resource(StatsAPI, '/api/stats')
_api.add_resource(ExportAPI, '/api/export')


@_app.route("/")
def index():
    return render_template('index.html')
