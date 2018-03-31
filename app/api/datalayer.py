from flask_restful import Resource, reqparse

parser = reqparse.RequestParser()
parser.add_argument('url', type=str, required=True)


class DataLayerAPI(Resource):

    def get(self):
        args = parser.parse_args()

        url = args.get('url')

        return {
            'url': url,
        }
