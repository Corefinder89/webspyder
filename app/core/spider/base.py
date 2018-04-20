
class Base():
    dict = {}
    def __init__(self, url):
        self.url = url
        self.driver=self.start_driver()
        self.get_page()
        self.parse_WebPageDetails()

    def start_driver(self):
        pass

    def close_driver(self):
        self.driver.quit()

    def get_page(self):
        self.driver.get(self.url)
        self.driver.implicitly_wait(2)

    def parse_WebPageDetails(self):
        self.get_page()
        requests=list()
        obj_requests = self.driver.execute_script("return window.performance.getEntries();")
        for obj_name in obj_requests:
            name = obj_name['name']
            transferSize = obj_name.get('transferSize',0)
            duration = obj_name['duration']
            requests.append({
                "name":name,
                "size":transferSize,
                "time":duration
            })
            print
        obj_overallPerformance = self.driver.execute_script("return performance.timing")
        obj_consoleLog = self.driver.get_log('browser')
        obj_dataLayer = self.driver.execute_script("return dataLayer;")
        obj_pageSource = self.driver.page_source
        self.close_driver()
        return {"requests":requests,"performance":obj_overallPerformance,"console":obj_consoleLog,"dataLayer":obj_dataLayer,"page_source":obj_pageSource}