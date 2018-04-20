from .function.library.transform import TransformLibrary
from .function.performance.transform import TransformPerformance


class Transform(object):
    
    @staticmethod
    def transform(base_url, data):
        libraries = TransformLibrary.transform(base_url, data['requests'])
        performance = TransformPerformance.transform(
            base_url,
            map(lambda x: x['library'].get('name'), libraries['libraries']), 
            libraries['requests']
        )

        return {
            'libraries': libraries,
            'performance': performance
        }
