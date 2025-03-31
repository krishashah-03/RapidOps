import google.generativeai as genai
import json
import re
import subprocess  # To run the generated script

# Configure Gemini API
genai.configure(api_key="AIzaSyBDEHjBIjXHndCpDnx_pRKaH-On8QwgMjs")

# Prompt for generating test cases
prompt = """ 
You are an expert in generating test cases for UI and functionality testing.
Follow the given example format strictly when generating test cases. and in testcases input and output take some relevant examples based on the website and products it contains to search,login,click,etc take some specific input and output examples not take random as xyz or something also check edge cases.
and with proper and correct xpath please dont give wrong xpath which cause errors even crawl if you want for that body/div[1]/div[3]/form[1]/div[1]/div[1]/div[3]/center[1]/input[2]. generate 5 testcases and also some long time functionalities like login, search,etc provide time accordingly dont timeout.
### Example Input:
"login": "Users should receive an error message in login form if they enter incorrect credentials.",
"search": "The search functionality should display relevant products.",
"cart": "Cart should not contain more than 100 items."

### Example Output:
[
  {
    "description": "Verify 'About' link on Google",
    "type": "link",
    "action": "click",
    "xpath": "body/div[1]/div[1]/a[1]",
    "expected": "no_error"
  }
]

### New Requirement: 
"button": "The search bus buttonn functionality should work properly as user should be able to click search bar on https://www.airbnb.co.in/ and dont introduce login testcases."

Generate test cases in the same JSON format.
"""

# Generate test cases
response = genai.GenerativeModel("models/gemini-2.0-flash").generate_content(prompt)

# Extract text content
text = response.candidates[0].content.parts[0].text

# Use regex to extract JSON from markdown-style block
match = re.search(r'```json\n(.*?)\n```', text, re.DOTALL)

if match:
    json_str = match.group(1)  # Extracted JSON string
    try:
        extracted_json = json.loads(json_str)  # Convert to Python object
        print(json.dumps(extracted_json, indent=2))  # Pretty print JSON
    except json.JSONDecodeError:
        print("Error: Invalid JSON format")
else:
    print("Error: No JSON found in response")
    exit(1)  # Exit if JSON extraction fails

# Prompt for generating Selenium script
# p = f"""
# Generate a Python Selenium script to automate testing on https://www.flipkart.com with proper and correct xpath please dont give wrong xpath which can cause errors based on the following test cases and it should test properly like if i search product then it should show test passed and failed  and also print or give report of the testcases passed and also please make the execution fast without timeout and failed and dont do timeout early according to the loading time of the testcase set the time atleast wait 30 secs for every testcase:

# {extracted_json}

# Ensure the script dynamically loads test cases, performs actions, and verifies expected outcomes.
# """
p = f"""
gemini you are  a pro selenium test code generater based on testcases. Generate a Python Selenium script to automate testing on https://redbus.netlify.app/ with proper and correct xpath and fast code without timeout

{extracted_json}

Ensure the script dynamically loads test cases, performs actions, and verifies expected outcomes.
"""
# Generate Selenium script
r = genai.GenerativeModel("models/gemini-2.0-flash").generate_content(p)

# Extract Selenium script text
selenium_script = r.candidates[0].content.parts[0].text

# Extract actual Python code from markdown block (if wrapped in ```python ```)
code_match = re.search(r'```python\n(.*?)\n```', selenium_script, re.DOTALL)

if code_match:
    selenium_script = code_match.group(1)

# Save the generated script to app2.py
with open("app2.py", "w", encoding="utf-8") as f:
    f.write(selenium_script)

print("✅ Selenium script saved as app2.py")

# Run the generated script automatically
try:
    print("🚀 Running app2.py...")
    subprocess.run(["python", "app2.py"], check=True)
except subprocess.CalledProcessError as e:
    print(f"❌ Error running app2.py: {e}")
