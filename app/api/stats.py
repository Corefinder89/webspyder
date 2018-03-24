from flask_restful import Resource, reqparse

parser = reqparse.RequestParser()
parser.add_argument('url', type=str, required=True)
parser.add_argument('mode', type=str, required=True)


class StatsAPI(Resource):

    def get(self):
        args = parser.parse_args()

        url = args.get('url')
        mode = args.get('mode')

        return {
            'url': url,
            'mode': mode
        }
