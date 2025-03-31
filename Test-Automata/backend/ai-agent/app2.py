from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time

class SeleniumTestFramework:
    def __init__(self, website_url):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        self.website_url = website_url
        self.test_cases = []
        self.results = []

    def run_test_cases(self,filename):
        self.driver.get(self.website_url)
        time.sleep(2)  # Allow page to load
        with open(filename, "r") as f:
            test_cases = json.load(f)
        
        total_tests = 0
        passed_tests = 0
        for test in test_cases:
            description = test.get("description", "No description provided")
            action = test.get("action")
            xpath = test.get("xpath")
            input_text = test.get("input", "")
            expected = test.get("expected", "No expected result defined")
            timeout = test.get("timeout", 5)

            try:
                element = WebDriverWait(self.driver, timeout).until(
                    EC.presence_of_element_located((By.XPATH, xpath))
                )

                if action == "click":
                    element.click()
                elif action == "send_keys":
                    element.send_keys(input_text)
                elif action == "send_keys_and_enter":
                    element.send_keys(input_text)
                    element.send_keys(Keys.RETURN)

                time.sleep(2)  # Wait for results if needed

                self.results.append({
                    "test": description,
                    "status": "PASS",
                    "expected": expected
                })

            except Exception as e:
                self.results.append({
                    "test": description,
                    "status": "FAIL",
                    "error": str(e),
                    "expected": expected
                })

    def generate_report(self):
        print("\n==== TEST REPORT ====")
        for result in self.results:
            print(f"Test: {result['test']}")
            print(f"Status: {result['status']}")
            print(f"Expected: {result['expected']}")
            if result["status"] == "FAIL":
                print(f"Error: {result['error']}")
            print("-" * 40)
    import json

    def save_results_to_json(self, filename="results.json"):
        with open(filename, "w") as f:
            json.dump(self.results, f, indent=4)
        print(f"\n✅ Test results saved in {filename}")

    def close(self):
        self.driver.quit()

# Example Test Cases (can be replaced with JSON input)

# Run Tests
def read_requirement_from_json():
    try:
        with open("requirements.json", "r") as file:
            data = json.load(file)
            requirement = data.get("requirements", "")
            website_link = data.get("websiteLink", "")
        return requirement, website_link
    except Exception as e:
        print(f"❌ Error reading requirements.json: {e}")
        return "", ""
requirement, url = read_requirement_from_json()
website_url = url
selenium_test = SeleniumTestFramework(website_url)
selenium_test.run_test_cases("test_cases.json")  # ✅ Run test cases from JSON file
selenium_test.save_results_to_json()  # ✅ Save test results in JSON
# selenium_test.generate_report()
selenium_test.close()
