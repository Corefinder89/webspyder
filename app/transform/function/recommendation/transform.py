import os
from urlparse import urlparse
from dl_config_loader import ConfigLoader

from bs4 import BeautifulSoup


class TransformRecommendation(object):
    
    @staticmethod
    def transform(libraries, requests, page_source):
        recommendations = list()
        recommendation_config = TransformRecommendation.load_recommendation_config().config
        for index, library in enumerate(libraries):
            recommendation = filter(lambda x: str(x['name']) == str(library['library'].get('name')), recommendation_config)
            if len(recommendation) == 1 and TransformRecommendation.valid_recommendation(recommendation[0], requests[index], page_source):
                recommendations.append({
                    "title": recommendation[0]['title'],
                    "description": recommendation[0]['message']
                })
        return recommendations

    @staticmethod
    def valid_recommendation(recommendation, request, page_source):
        url = request['name']
        return recommendation_type_map[recommendation['type']](url, recommendation["value"], page_source)

    @staticmethod
    def load_recommendation_config():
        return ConfigLoader.load(os.path.join(os.path.dirname(os.path.realpath(__file__)),'config.json'))


recommendation_type_map = {
    'depricated': lambda x, y, z: os.path.basename(urlparse(x).path) == y,
    'placement': lambda x, y, z: not os.path.basename(urlparse(x).path) in BeautifulSoup(z, 'html.parser').find(y)
}
