import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
class FlipkartLoginTests(unittest.TestCase):

    def setUp(self):
        """Set up the test environment before each test."""
        self.driver = webdriver.Chrome()  # Or any other browser driver you prefer
        self.driver.get("https://www.flipkart.com/")
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 10)  # Define a wait object


    def tearDown(self):
        """Clean up after each test."""
        self.driver.quit()


    def perform_login(self, username, password):
        """Performs the login action based on username and password."""
        try:
            # Close the initial login popup if it appears
            close_login_popup_xpath = "//button[@class='_2KpZ6l _2doB4z']"
            close_button = self.wait.until(EC.element_to_be_clickable((By.XPATH, close_login_popup_xpath)))
            close_button.click()
        except TimeoutException:
            # Login popup did not appear, continue
            pass


        # Click on the "Login" button
        login_button_xpath = "//a[text()='Login']"  # More robust xpath
        login_button = self.wait.until(EC.element_to_be_clickable((By.XPATH, login_button_xpath)))
        login_button.click()



        # Enter username
        username_field_xpath = "//input[@class='_2IX_2- VJZDxU']"
        username_field = self.wait.until(EC.presence_of_element_located((By.XPATH, username_field_xpath)))
        username_field.send_keys(username)

        # Enter password
        password_field_xpath = "//input[@type='password']"
        password_field = self.wait.until(EC.presence_of_element_located((By.XPATH, password_field_xpath)))
        password_field.send_keys(password)

        # Click login submit button
        login_submit_button_xpath = "//button[@class='_2KpZ6l _2HKlqg _3sgqBj']"
        login_submit_button = self.wait.until(EC.element_to_be_clickable((By.XPATH, login_submit_button_xpath)))
        login_submit_button.click()

    def verify_login_result(self, expected_result):
        """Verifies the login result based on the expected outcome."""

        if expected_result == "successful_login":
            try:
                # Check for a successful login indicator (e.g., user profile button)
                user_profile_button_xpath = "//div[text()='My Account']"  # Improved xpath, check text
                self.wait.until(EC.presence_of_element_located((By.XPATH, user_profile_button_xpath)))
                return True
            except TimeoutException:
                return False
        elif expected_result == "error_message":
            try:
                 # Check for the error message element
                error_message_xpath = "//span[contains(text(),'Please enter valid Email ID/Mobile number') or contains(text(),'Incorrect username or password.')]"
                self.wait.until(EC.presence_of_element_located((By.XPATH, error_message_xpath)))
                return True
            except TimeoutException:
                return False  # No error message found
        else:
            return False  # Unknown expected result


    def test_login_scenarios(self):
        """Dynamically runs login tests based on the test data."""

        test_cases = [
            {'description': 'Verify successful login with valid credentials.', 'type': 'authentication',
             'action': 'login', 'username': 'your_valid_username',  #REPLACE WITH VALID CREDENTIALS
             'password': 'your_valid_password',   #REPLACE WITH VALID CREDENTIALS
             'expected': 'successful_login'},
            {'description': 'Verify unsuccessful login with invalid username.', 'type': 'authentication',
             'action': 'login', 'username': 'invalid_username', 'password': 'valid_password',
             'expected': 'error_message'},
            {'description': 'Verify unsuccessful login with invalid password.', 'type': 'authentication',
             'action': 'login', 'username': 'valid_username', 'password': 'invalid_password',
             'expected': 'error_message'},
            {'description': 'Verify unsuccessful login with empty username.', 'type': 'authentication',
             'action': 'login', 'username': '', 'password': 'valid_password', 'expected': 'error_message'},
            {'description': 'Verify unsuccessful login with empty password.', 'type': 'authentication',
             'action': 'login', 'username': 'valid_username', 'password': '', 'expected': 'error_message'},
            {'description': 'Verify unsuccessful login with empty username and password.', 'type': 'authentication',
             'action': 'login', 'username': '', 'password': '', 'expected': 'error_message'}
        ]


        for test_case in test_cases:
            with self.subTest(test_case['description']):  # Use subTest for better reporting
                self.perform_login(test_case['username'], test_case['password'])
                result = self.verify_login_result(test_case['expected'])
                self.assertTrue(result, f"Test Failed: {test_case['description']}")
                # Optional: clear the fields for the next test to avoid side effects
                #  It can be unreliable and could potentially cause issues when a valid username and password were used.
                #  Therefore, I have commented out this section for testing with valid credentials to prevent unexpected test failures.
                #username_field_xpath = "//input[@class='_2IX_2- VJZDxU']"
                #username_field = self.wait.until(EC.presence_of_element_located((By.XPATH, username_field_xpath)))
                #username_field.clear()
                #password_field_xpath = "//input[@type='password']"
                #password_field = self.wait.until(EC.presence_of_element_located((By.XPATH, password_field_xpath)))
                #password_field.clear()



if __name__ == "__main__":
    unittest.main()