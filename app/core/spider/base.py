<<<<<<< HEAD
class Base ( ):
    dict = {}

    # Constructor that would initialize all the methods of the class
    def __init__(self, url):
        self.url = url
        self.driver = self.start_driver ( )
        self.get_page ( )
        self.parse_WebPageDetails ( )
=======
from selenium.common.exceptions import WebDriverException

class Base():
    # Constructor that would initialize all the methods of the class
    def __init__(self, url):
        self.url = url
        self.driver=self.start_driver()
        self.get_page()
>>>>>>> 41c7bb629393ce628c27308b0d61ca4239c92372

    # Instantiate driver
    def start_driver(self):
        pass

    # Deflate Driver
    def close_driver(self):
        self.driver.quit ( )

    # Get required page
    def get_page(self):
        self.driver.get (self.url)
        self.driver.implicitly_wait (2)

    # Get required WebPage Information
    def parse_WebPageDetails(self):
<<<<<<< HEAD
        self.get_page ( )
        requests = list ( )
        obj_requests = self.driver.execute_script ("return window.performance.getEntries();")
        obj_overallPerformance = self.driver.execute_script ("return performance.timing")
        obj_consoleLog = self.driver.get_log ('browser')
        obj_dataLayer = self.driver.execute_script ("return dataLayer;")
=======
        self.get_page()
        obj_requests = self.driver.execute_script("return window.performance.getEntries();")
        obj_overallPerformance = self.driver.execute_script("return performance.timing")
        obj_consoleLog = self.driver.get_log('browser')
        try:
            obj_dataLayer = self.driver.execute_script("return dataLayer;")
        except WebDriverException:
            obj_dataLayer = None
>>>>>>> 41c7bb629393ce628c27308b0d61ca4239c92372
        obj_pageSource = self.driver.page_source
        self.close_driver ( )

<<<<<<< HEAD
        # Return dictionary of objects
        return {"requests": obj_requests, "performance": obj_overallPerformance, "console": obj_consoleLog,
                "dataLayer": obj_dataLayer, "page_source": obj_pageSource}
=======
        #Return dictionary of objects
        return {
            "requests": obj_requests,
            "performance": obj_overallPerformance,
            "console": obj_consoleLog,
            "dataLayer": obj_dataLayer,
            "page_source": obj_pageSource
        }
>>>>>>> 41c7bb629393ce628c27308b0d61ca4239c92372
