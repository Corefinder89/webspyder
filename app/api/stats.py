from flask_restful import Resource, reqparse

from app.core.spider.desktop import WebSpyder_Desktop
from app.core.spider.mobile import WebSpyder_Mobile

from app.transform.transform import Transform

parser = reqparse.RequestParser()
parser.add_argument('url', type=str, required=True)
parser.add_argument('mode', type=str, required=True)


class StatsAPI(Resource):

    def get(self):
        args = parser.parse_args()

        url = args.get('url')
        mode = args.get('mode')

        spider = mode_spider_map[mode](url)
        data = spider.parse_WebPageDetails()

        data = Transform.transform(url, data)

        return data


mode_spider_map = {
    'desktop': WebSpyder_Desktop,
    'mobile': WebSpyder_Mobile
}