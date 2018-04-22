from flask_restful import Resource, reqparse

from app.core.spider.desktop import WebSpyder_Desktop
from app.core.spider.mobile import WebSpyder_Mobile

from app.transform.transform import Transform

parser = reqparse.RequestParser()
parser.add_argument('url', type=str, required=True)
parser.add_argument('mode', type=str, required=True)


class StatsAPI(Resource):

    def get(self):
        return {
            "collect": [
                {
                    "connectEnd": 0, 
                    "connectStart": 0, 
                    "decodedBodySize": 0, 
                    "domainLookupEnd": 0, 
                    "domainLookupStart": 0, 
                    "duration": 932.4999999953434, 
                    "encodedBodySize": 0, 
                    "entryType": "resource", 
                    "fetchStart": 1363.8999999966472, 
                    "initiatorType": "img", 
                    "name": "https://www.google-analytics.com/collect?v=1&_v=j67&a=459001207&t=pageview&_s=1&dl=https%3A%2F%2Fwww.telstra.com.au%2F&ul=en-us&de=UTF-8&dt=Telstra%20-%20mobile%20phones%2C%20prepaid%20phones%2C%20broadband%2C%20internet%2C%20home%20phones%2C%20business%20phones&sd=24-bit&sr=1280x800&vp=800x600&je=0&_u=SCCAgEArC~&jid=&gjid=&cid=188107825.1524384947&uid=&tid=UA-7222659-6&_gid=1132339338.1524384947&gtm=G46TVKL9D&cg5=corporate&cd3=TD%3ATR%3ATR%3A%3Atelstra%20corporate&cd6=corporate&cd7=corporate&cd8=&cd22=aam%3D2751204%2Caam%3D3339063%2Caam%3D2768997%2Caam%3D3894207%2Caam%3D9263103%2Caam%3D9794169&cd37=70175450279252025006728454483404184277&z=211063797", 
                    "nextHopProtocol": "h2", 
                    "redirectEnd": 0, 
                    "redirectStart": 0, 
                    "requestStart": 0, 
                    "responseEnd": 2296.3999999919906, 
                    "responseStart": 0, 
                    "secureConnectionStart": 0, 
                    "serverTiming": [], 
                    "startTime": 1363.8999999966472, 
                    "toJSON": {}, 
                    "transferSize": 0, 
                    "workerStart": 0
                }, 
                {
                    "connectEnd": 3906.199999997625, 
                    "connectStart": 3906.199999997625, 
                    "decodedBodySize": 42, 
                    "domainLookupEnd": 3906.199999997625, 
                    "domainLookupStart": 3906.199999997625, 
                    "duration": 110.3000000002794, 
                    "encodedBodySize": 42, 
                    "entryType": "resource", 
                    "fetchStart": 3906.199999997625, 
                    "initiatorType": "img", 
                    "name": "https://www.google-analytics.com/r/collect?v=1&_v=j67&a=459001207&t=event&ni=0&_s=1&dl=https%3A%2F%2Fwww.telstra.com.au%2F&ul=en-us&de=UTF-8&dt=Telstra%20-%20mobile%20phones%2C%20prepaid%20phones%2C%20broadband%2C%20internet%2C%20home%20phones%2C%20business%20phones&sd=24-bit&sr=1280x800&vp=800x600&je=0&ec=Site%20Experiment&ea=TT%3AVarB%3A%20Unknown%20Cust&el=TT%3ATComExplore%20%3E%20PAS-1026%20Targeted%20messaging%20to%20promote%20network%20superiority%20%5BTCOM%5D&_u=SCCACEArD~&jid=1824560741&gjid=395238046&cid=188107825.1524384947&uid=&tid=UA-7222659-6&_gid=1132339338.1524384947&_r=1&gtm=G46TVKL9D&cg5=corporate&cd3=TD%3ATR%3ATR%3A%3Atelstra%20corporate&cd6=corporate&cd7=corporate&cd8=&cd12=&cd22=aam%3D2751204%2Caam%3D3339063%2Caam%3D2768997%2Caam%3D3894207%2Caam%3D9263103%2Caam%3D9794169&cd37=70175450279252025006728454483404184277&z=2042292406", 
                    "nextHopProtocol": "h2", 
                    "redirectEnd": 0, 
                    "redirectStart": 0, 
                    "requestStart": 3906.5000000118744, 
                    "responseEnd": 4016.4999999979045, 
                    "responseStart": 4015.700000018114, 
                    "secureConnectionStart": 0, 
                    "serverTiming": [], 
                    "startTime": 3906.199999997625, 
                    "toJSON": {}, 
                    "transferSize": 109, 
                    "workerStart": 0
                }
            ], 
            "console": [
                {
                    "level": "WARNING", 
                    "message": "https://assets.adobedtm.com/09d79ff7891fd87dd491ffa94fd3a8d7eb4d80b3/satelliteLib-e2f8fad8ed4c69e40537e242493d3ee59ff05d89.js 1 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/09d79ff7891fd87dd491ffa94fd3a8d7eb4d80b3/scripts/satellite-595477b564746d7634001e98.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.", 
                    "source": "javascript", 
                    "timestamp": 1524384929636
                }, 
                {
                    "level": "WARNING", 
                    "message": "https://assets.adobedtm.com/09d79ff7891fd87dd491ffa94fd3a8d7eb4d80b3/satelliteLib-e2f8fad8ed4c69e40537e242493d3ee59ff05d89.js 1 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/09d79ff7891fd87dd491ffa94fd3a8d7eb4d80b3/scripts/satellite-5976ccf664746d0131004481.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.", 
                    "source": "javascript", 
                    "timestamp": 1524384929637
                }
            ], 
            "cookies": [
                {
                    "domain": ".telstra.com.au", 
                    "expiry": 1587456956, 
                    "httpOnly": False, 
                    "name": "_ga", 
                    "path": "/", 
                    "secure": False, 
                    "value": "GA1.3.188107825.1524384947"
                }
            ], 
            "libraries": {
                "children": [
                    {
                        "key": "Google Analytics", 
                        "root": 0, 
                        "size": 10
                    }, 
                    {
                        "key": "Facebook Tag", 
                        "root": 1, 
                        "size": 10
                    }, 
                    {
                        "key": "DoubleClick Tag", 
                        "root": 2, 
                        "size": 10
                    }, 
                    {
                        "key": "Google Tag Manager", 
                        "root": 3, 
                        "size": 10
                    }, 
                    {
                        "key": "GA Ecommerce", 
                        "root": 4, 
                        "size": 10
                    }
                ], 
                "key": "www.telstra.com.au", 
                "size": 50
            }, 
            "performance": {
                "overall": [
                    {
                        "name": "DOM Load", 
                        "percent": 78.19548872180451
                    }, 
                    {
                        "name": "Load Event", 
                        "percent": 21.804511278195488
                    }
                ], 
                "size": [
                    {
                        "name": "Google Analytics", 
                        "percent": 46.473779385171795
                    }, 
                    {
                        "name": "Facebook Tag", 
                        "percent": 47.85887422569351
                    }, 
                    {
                        "name": "DoubleClick Tag", 
                        "percent": 0.6810049632565118
                    }, 
                    {
                        "name": "Google Tag Manager", 
                        "percent": 0.0
                    }, 
                    {
                        "name": "GA Ecommerce", 
                        "percent": 4.986341425878189
                    }
                ], 
                "time": [
                    {
                        "name": "Google Analytics", 
                        "percent": 0.0
                    }, 
                    {
                        "name": "Facebook Tag", 
                        "percent": 5.732662189084563
                    }, 
                    {
                        "name": "DoubleClick Tag", 
                        "percent": 78.91498882605227
                    }, 
                    {
                        "name": "Google Tag Manager", 
                        "percent": 11.689038027232376
                    }, 
                    {
                        "name": "GA Ecommerce", 
                        "percent": 3.663310957630795
                    }
                ]
            }, 
            "recommendations": [
                {
                    "description": "gtm.js should be configured under <head> section.", 
                    "title": "gtm.js is not configured in <head>"
                }, 
                {
                    "description": "It is recommended to use ecommerce.js library rendered via anlaytics.js.", 
                    "title": "ec.js is loaded"
                }
            ]
        }
        args = parser.parse_args()

        url = args.get('url')
        mode = args.get('mode')

        if not url.startswith("http"):
            url = "http://" + url

        spider = mode_spider_map[mode](url)
        data = spider.parse_WebPageDetails()

        data = Transform.transform(url, data)

        return data


mode_spider_map = {
    'desktop': WebSpyder_Desktop,
    'mobile': WebSpyder_Mobile
}