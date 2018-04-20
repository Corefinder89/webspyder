class Base():
    # Constructor that would initialize all the methods of the class
    def __init__(self, url):
        self.url = url
        self.driver=self.start_driver()
        self.get_page()
        self.cookie_names = [
            "_ga",
            "_gclid"
        ]

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
        self.get_page()
        obj_requests = self.driver.execute_script("return window.performance.getEntries();")
        obj_overallPerformance = self.driver.execute_script("return performance.timing")
        obj_consoleLog = self.driver.get_log('browser')
        try:
            obj_dataLayer = self.driver.execute_script("return dataLayer;")
        except WebDriverException:
            obj_dataLayer = None
        for i in self.cookie_names:
            try:
                obj_cookie = self.driver.get_cookie(i)
            except WebDriverException as e:
                obj_cookie = None
        obj_pageSource = self.driver.page_source
        self.close_driver ( )

        #Return dictionary of objects
        return {
            "requests": obj_requests,
            "performance": obj_overallPerformance,
            "console": obj_consoleLog,
            "dataLayer": obj_dataLayer,
            "page_source": obj_pageSource,
            "cookie": obj_cookie
        }
