from flask_restful import Resource, reqparse

from app.core.spider.desktop import WebSpyder_Desktop

parser = reqparse.RequestParser()
parser.add_argument('url', type=str, required=True)


class DataLayerAPI(Resource):

    def get(self):
        args = parser.parse_args()

        url = args.get('url')

        spider = WebSpyder_Desktop(url)
        data = spider.parse_WebPageDetails()

        return data['dataLayer']
