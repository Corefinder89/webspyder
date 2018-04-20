import requests

class TransformPerformance(object):

    @staticmethod 
    def transform(base_url, libraries, requests):
        size_performance = list()
        time_performance = list()

        for request in requests:
            if request['encodedBodySize'] == 0:
                request['encodedBodySize'] = TransformPerformance.get_resource_size(request['name'])

        sum_size = float(sum(map(lambda x: x['encodedBodySize'], requests)))
        sum_time = float(sum(map(lambda x: x['duration'], requests)))

        for index, request in enumerate(requests):

            if sum_size > 0:
                size_performance.append({
                    "name": libraries[index],
                    "percent": (request["encodedBodySize"] / sum_size) * 100
                })

            if sum_time > 0:
                time_performance.append({
                    "name": libraries[index],
                    "percent": (request["duration"] / sum_time) * 100
                })

        return {
            "time": time_performance,
            "size": size_performance
        }

    @staticmethod
    def get_resource_size(url):
        response = requests.head(url)
        if response.status_code == 200:
            return int(response.headers.get('Content-Length', 0))
        return 0
