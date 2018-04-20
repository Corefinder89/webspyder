from .function.library.transform import TransformLibrary
from .function.performance.transform import TransformPerformance
from .function.recommendation.transform import TransformRecommendation

from urlparse import urlparse


class Transform(object):

    @staticmethod
    def transform(base_url, data):
        libraries = TransformLibrary.transform(base_url, data['requests'])
        performance = TransformPerformance.transform(
            base_url,
            map(lambda x: x['library'].get('name'), libraries['libraries']),
            libraries['requests'],
            data['performance']
        )
        recommendations = TransformRecommendation.transform(libraries['libraries'], libraries['requests'], data['page_source'])

        return {
            'libraries': libraries['tree'],
            'performance': performance,
            'console': Transform.filter(data['console'], key="message"),
            'collect': filter(lambda x: Transform.is_collect_request(x['name']), data['requests']),
            'cookies': data['cookies'],
            'recommendations': recommendations
        }

    @staticmethod
    def is_collect_request(url):
        parse = urlparse(url)
        if not parse.hostname or not parse.path:
            return False
        return "www.google-analytics.com" in parse.hostname and "collect" in parse.path

    @staticmethod
    def filter(data, key):
        contains = dict()
        new_data = list()
        for element in data:
            if not contains.get(element[key]):
                contains[element[key]] = True
                new_data.append(element)
        return new_data
