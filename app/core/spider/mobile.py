from selenium import webdriver
from time import sleep
from selenium.common.exceptions import WebDriverException
from app.core.spider.base import Base
import os

class WebSpyder_Mobile(Base):

    # Start Driver
    def start_driver(self):
        try:
            chrome_bin_path = self.get_driver_path()
            chromeOptions = self.configure_chrome_options()
            driver = webdriver.Chrome(
                executable_path=chrome_bin_path,
                chrome_options=chromeOptions
            )
            return driver
        except WebDriverException as e:
            print "WebDriver exception"
            print e

    sleep(4)

    @staticmethod
    # Get required driver path
    def get_driver_path():
        path = os.getcwd()
        bin_path = os.path.join(path,'chromedriver')
        return bin_path

    # Configure chrome options for mobile - Includes configuration of User agent
    @staticmethod
    def configure_chrome_options():
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument(
            "user-agent=Mozilla/5.0 (iPhone; CPU "+
            "iPhone OS 10_0_1 like Mac OS X) "+
            "AppleWebKit/602.1.50 (KHTML, like Gecko) "+
            "Version/10.0 Mobile/14A403 Safari/602.1"
        )
        return options
