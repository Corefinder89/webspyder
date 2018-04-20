class TransformPerformance(object):

    @staticmethod 
    def transform(base_url, libraries, requests):
        size_performance = list()
        time_performance = list()

        sum_size = float(sum(map(lambda x: x['transferSize'], requests)))
        sum_time = float(sum(map(lambda x: x['duration'], requests)))

        for index, request in enumerate(requests):
            size_performance.append({
                "name": libraries[index],
                "percent": (request["transferSize"] / sum_size) * 100
            })

            time_performance.append({
                "name": libraries[index],
                "percent": (request["duration"] / sum_time) * 100
            })

        return {
            "time": time_performance,
            "size": size_performance
        }
