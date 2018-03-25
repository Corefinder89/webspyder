import ast

from flask_restful import Resource, reqparse

from ..helpers import ExportHelper

parser = reqparse.RequestParser()
parser.add_argument('data', type=str, action='append', required=True)
parser.add_argument('svgs', type=str, action='append', required=True)


class ExportAPI(Resource):

    def post(self):
        args = parser.parse_args()

        data = None
        svgs = None

        if args.get("data") is not None:
            data = map(lambda x: ast.literal_eval(x), args.get("data"))[0]

        if args.get("svgs") is not None:
            svgs = map(lambda x: ast.literal_eval(x), args.get("svgs"))[0]

        export_helper = ExportHelper()
        export_helper.export_to_pdf(data, svgs)

        return {

        }
