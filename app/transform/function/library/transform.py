import os
from urlparse import urlparse
from dl_config_loader import ConfigLoader


class TransformLibrary(object):
    @staticmethod
    def load_library_config():
        return ConfigLoader.load(os.path.join(os.path.dirname(os.path.realpath(__file__)),'config.json'))

    @staticmethod
    def transform(base_url, requests):
        library_config = TransformLibrary.load_library_config()
        libraries = list()
        libraries_found = dict()
        for request in requests:
            url = request.get('name')
            library = TransformLibrary.satisfy_condition(url, library_config)
            if library and libraries_found.get(library['library'].get('name')):
                library = None
            if library:
                libraries_found[library['library'].get('name')] = True
            libraries.append(library)
        valid_requests = [r for index, r in enumerate(requests) if libraries[index] is not None]
        libraries = filter(lambda x: x is not None, libraries)

        return {
            "tree": TransformLibrary.ui_transform(base_url, libraries), 
            "libraries": libraries, 
            "requests": valid_requests
        }

    @staticmethod
    def ui_transform(url, libraries):
        tree = {
            "key": url,
            "size": 10 * len(libraries),
            "children": list()
        }

        for index, library in enumerate(libraries):
            tree['children'].append({
                "key": library['library'].get('name'),
                "size": 10,
                "root": index
            })

        return tree

    @staticmethod
    def satisfy_condition(url, library_config):
        for library_type in library_config.keys():
            for library_object in library_config[library_type]:
                condition = library_object.condition
                conditions = TransformLibrary.evaluate_conditions(url, condition.conditions)
                operator_function = any if condition['$operator'] == '$or' else all
                if operator_function(conditions):
                    library = {
                        "type": library_type,
                        "library": library_object
                    }
                    return library
        return None

    @staticmethod
    def evaluate_conditions(url, base_conditions):
        conditions = list()
        for condition in base_conditions:
            case = condition.get("$case", "matchcase")
            value1 = condition['$value']
            value2 = location_map[condition['$location']](url)
            result = None
            if value1 and value2:
                if case == "ignorecase":
                    value1 = value1.lower()
                    value2 = value2.lower()
                result = conditions_map[condition['$condition']](value1, value2)
            conditions.append(result)
        return conditions


conditions_map = {
    "contains": lambda x, y: x in y,
    "equals": lambda x, y: x == y
}

location_map = {
    "host": lambda x: urlparse(x).hostname,
    "path": lambda x: urlparse(x).path,
}
