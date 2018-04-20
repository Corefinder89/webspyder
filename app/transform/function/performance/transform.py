import requests

class TransformPerformance(object):

    @staticmethod 
    def transform(base_url, libraries, requests, performance):
        size_performance = list()
        time_performance = list()
        response = None
        dom_load = None

        for request in requests:
            if request['encodedBodySize'] == 0:
                request['encodedBodySize'] = TransformPerformance.get_resource_size(request['name'])

        sum_size = float(sum(map(lambda x: x['encodedBodySize'], requests)))
        sum_time = float(sum(map(lambda x: x['duration'], requests)))
        sum_overall = float((performance["domContentLoadedEventEnd"] - performance["domContentLoadedEventStart"]) + (performance["loadEventEnd"] - performance["loadEventStart"]))

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

        if sum_overall > 0:
            dom_load = ((performance["domContentLoadedEventEnd"] - performance["domContentLoadedEventStart"]) / sum_overall) * 100
            response = ((performance["loadEventEnd"] - performance["loadEventStart"]) / sum_overall) * 100

        return {
            "time": time_performance,
            "size": size_performance,
            "overall": [{
                "name": "DOM Load",
                "percent": dom_load
            }, {
                "name": "Load Event",
                "percent": response
            }] if dom_load and response else []
        }

    @staticmethod
    def get_resource_size(url):
        response = requests.head(url)
        if response.status_code == 200:
            return int(response.headers.get('Content-Length', 0))
        return 0
