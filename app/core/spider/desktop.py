from selenium import webdriver
from time import sleep
from selenium.common.exceptions import WebDriverException
from app.core.spider.base import Base
import os


class WebSpyder_Desktop (Base):

    # Start driver
    def start_driver(self):
        try:
            chrome_bin_path = self.get_driver_path ( )
            chromeOptions = self.configure_chrome_options ( )
            driver = webdriver.Chrome (
                executable_path=chrome_bin_path,
                chrome_options=chromeOptions
            )
            return driver
        except WebDriverException as e:
            print "WebDriver exception"
            print e

    sleep (4)

    @staticmethod
    # Get the driver path
    def get_driver_path():
        path = os.getcwd ( )
        bin_path = os.path.join (path, 'chromedriver')
        return bin_path

    # COnfigure chrome options for Desktop
    @staticmethod
    def configure_chrome_options():
        options = webdriver.ChromeOptions ( )
        options.add_argument ('--headless')
        return options
