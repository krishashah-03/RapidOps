import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

class GoogleSearchTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()  # Or other browser driver
        self.driver.get("https://www.google.com")
        self.driver.implicitly_wait(10)  # wait 10 seconds if element not immediately present

        self.test_cases = [
            {'description': 'Verify search bar accepts input', 'type': 'input', 'action': 'enter_text', 'xpath': "//textarea[@id='APjFqb']", 'input': 'Test Product', 'expected': 'text_entered'},
            {'description': 'Verify search button triggers search', 'type': 'button', 'action': 'click', 'xpath': "//div[@class='FPdoLc lJ9FBc']//input[@name='btnK']", 'expected': 'search_results_displayed'},
            {'description': 'Verify search results are displayed', 'type': 'element', 'action': 'verify_visibility', 'xpath': "//div[@id='search']", 'expected': 'visible'},
            {'description': "Verify 'No results found' message for invalid search query", 'type': 'input', 'action': 'enter_text', 'xpath': "//textarea[@id='APjFqb']", 'input': 'asdfghjklqwertyuiop', 'expected': 'no_results_message'},
            {'description': 'Verify special characters in search query', 'type': 'input', 'action': 'enter_text', 'xpath': "//textarea[@id='APjFqb']", 'input': '!@#$%', 'expected': 'search_results_displayed_or_no_results_message'}
        ]

    def tearDown(self):
        self.driver.quit()

    def test_google_search(self):
        for test_case in self.test_cases:
            print(f"Running test case: {test_case['description']}")
            element = self.driver.find_element(By.XPATH, test_case['xpath'])

            if test_case['action'] == 'enter_text':
                element.clear()
                element.send_keys(test_case['input'])

                if test_case['description'] != 'Verify search button triggers search':
                  if test_case['expected'] == 'text_entered':
                    self.assertEqual(element.get_attribute('value'), test_case['input'], "Input text does not match")

                # Added an extra enter press after text for better navigation
                if test_case['description'] == 'Verify search bar accepts input':
                    element.send_keys(Keys.RETURN)
                elif test_case['description'] == "Verify 'No results found' message for invalid search query":
                  element.send_keys(Keys.RETURN)
                elif test_case['description'] == 'Verify special characters in search query':
                  element.send_keys(Keys.RETURN)

            elif test_case['action'] == 'click':
                element.click()
            elif test_case['action'] == 'verify_visibility':
                WebDriverWait(self.driver, 10).until(
                    EC.visibility_of_element_located((By.XPATH, test_case['xpath']))
                )
                self.assertTrue(element.is_displayed(), "Element is not visible")


            # Verification based on 'expected' value
            if test_case['expected'] == 'search_results_displayed':
                try:
                  WebDriverWait(self.driver, 10).until(
                      EC.visibility_of_element_located((By.ID, "search"))
                  )
                  search_results = self.driver.find_element(By.ID, "search")
                  self.assertTrue(search_results.is_displayed(), "Search results are not displayed")
                except NoSuchElementException:
                  self.fail("Search results not found.")
                except Exception as e:
                  self.fail(f"Search results did not display, error: {e}")

            elif test_case['expected'] == 'no_results_message':
                try:
                    no_results_xpath = "//div[@id='res']/div/div/div/div[1]/div/span" #Updated xpath
                    WebDriverWait(self.driver, 10).until(
                        EC.visibility_of_element_located((By.XPATH, no_results_xpath))
                    )
                    no_results_element = self.driver.find_element(By.XPATH, no_results_xpath)
                    self.assertTrue(no_results_element.is_displayed(), "'No results found' message is not displayed")
                except (NoSuchElementException, TimeoutError):
                    self.fail("'No results found' message not displayed")

            elif test_case['expected'] == 'search_results_displayed_or_no_results_message':
                try:
                  WebDriverWait(self.driver, 10).until(
                      EC.visibility_of_element_located((By.ID, "search"))
                  )
                  search_results = self.driver.find_element(By.ID, "search")
                  if search_results.is_displayed():
                      print("Search results displayed for special characters.")
                  else:
                      print("No search results displayed for special characters.")  # For debugging
                except NoSuchElementException:
                    try:
                        no_results_xpath = "//div[@id='res']/div/div/div/div[1]/div/span"
                        WebDriverWait(self.driver, 10).until(
                            EC.visibility_of_element_located((By.XPATH, no_results_xpath))
                        )
                        no_results_element = self.driver.find_element(By.XPATH, no_results_xpath)
                        self.assertTrue(no_results_element.is_displayed(), "'No results found' message is not displayed")
                        print("No results found for special characters.") # For debugging
                    except (NoSuchElementException, TimeoutError):
                        self.fail("Neither search results nor 'No results' message found")
                except Exception as e:
                  print(f"An unexpected error occurred: {e}")  # Debug
                  self.fail(f"An error occurred while checking search results: {e}")


if __name__ == "__main__":
    unittest.main()