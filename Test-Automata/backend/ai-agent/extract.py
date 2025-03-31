# import json
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# import subprocess
# # Define element categories
# ELEMENT_CATEGORIES = {
#     "input_fields": ["input"],
#     "buttons": ["button", "a", "div"],
#     "links": ["a"],
#     "dropdowns": ["select"],
#     "checkboxes": ["input[@type='checkbox']"],
#     "radio_buttons": ["input[@type='radio']"],
#     "text_areas": ["textarea"],
#     "text_fields": ["input[@type='text']", "input[@type='email']", "input[@type='password']"],
#     "text": ["p", "span", "div"],
#     "images": ["img"],
#     "iframes": ["iframe"],
#     "tables": ["table"],
#     "divs": ["div"],
#     "spans": ["span"],
#     "paragraphs": ["p"],
#     "headings": ["h1", "h2", "h3", "h4", "h5", "h6"],
#     "labels": ["label"],
#     "containers": ["div", "section", "article", "aside"],
#     "sections": ["section"],
#     "articles": ["article"],
#     "asides": ["aside"],
#     "footers": ["footer"],
#     "headers": ["header"],
#     "navs": ["nav"],
#     "forms": ["form"],
#     "lists": ["ul", "ol"],
#     "list_items": ["li"]
# }

# # Generate accurate XPath for an element using JavaScript
# def generate_xpath(driver, element):
#     return driver.execute_script("""
#         function getXPath(el) {
#             if (el.id !== '') return '//*[@id="' + el.id + '"]';
#             if (el === document.body) return '/html/' + el.tagName;
#             var ix = 0;
#             var siblings = el.parentNode.childNodes;
#             for (var i = 0; i < siblings.length; i++) {
#                 var sibling = siblings[i];
#                 if (sibling === el) return getXPath(el.parentNode) + '/' + el.tagName + '[' + (ix + 1) + ']';
#                 if (sibling.nodeType === 1 && sibling.tagName === el.tagName) ix++;
#             }
#         }
#         return getXPath(arguments[0]);
#     """, element)

# # Extract XPaths for categorized elements
# def extract_xpaths(url):
#     driver = webdriver.Chrome()
#     driver.get(url)

#     extracted_xpaths = {category: [] for category in ELEMENT_CATEGORIES.keys()}

#     for category, selectors in ELEMENT_CATEGORIES.items():
#         for selector in selectors:
#             try:
#                 elements = driver.find_elements(By.XPATH, f"//{selector}")
#                 for element in elements:
#                     xpath = generate_xpath(driver, element)
#                     extracted_xpaths[category].append(xpath)
#             except:
#                 continue

#     driver.quit()

#     # Save to JSON
#     with open("extracted_xpaths.json", "w") as file:
#         json.dump(extracted_xpaths, file, indent=4)

#     print("\n✅ Extracted XPaths saved to 'extracted_xpaths.json'.")

# # Example Usage
# def read_requirement_from_json():
#     try:
#         with open("requirements.json", "r") as file:
#             data = json.load(file)
#             requirement = data.get("requirements", "")
#             website_link = data.get("websiteLink", "")
#         return requirement, website_link
#     except Exception as e:
#         print(f"❌ Error reading requirements.json: {e}")
#         return "", ""
    
# requirement, url = read_requirement_from_json()
# extract_xpaths(url)
# try:
#     print("🚀 Running app3.py...")
#     subprocess.run(["python", "app3.py"], check=True)
# except subprocess.CalledProcessError as e:
#     print(f"❌ Error running app3.py: {e}")
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
import subprocess
from flask import Flask, jsonify

# Flask server setup
app = Flask(__name__)

# Element categories for XPath extraction
ELEMENT_CATEGORIES = {
    "input_fields": ["input"],
    "buttons": ["button", "a", "div"],
    "links": ["a"],
    "dropdowns": ["select"],
    "checkboxes": ["input[@type='checkbox']"],
    "radio_buttons": ["input[@type='radio']"],
    "text_areas": ["textarea"],
    "text_fields": ["input[@type='text']", "input[@type='email']", "input[@type='password']"],
    "text": ["p", "span", "div"],
    "images": ["img"],
    "iframes": ["iframe"],
    "tables": ["table"],
    "divs": ["div"],
    "spans": ["span"],
    "paragraphs": ["p"],
    "headings": ["h1", "h2", "h3", "h4", "h5", "h6"],
    "labels": ["label"],
    "containers": ["div", "section", "article", "aside"],
    "sections": ["section"],
    "articles": ["article"],
    "asides": ["aside"],
    "footers": ["footer"],
    "headers": ["header"],
    "navs": ["nav"],
    "forms": ["form"],
    "lists": ["ul", "ol"],
    "list_items": ["li"]
}

# Generate accurate XPath for an element using JavaScript
def generate_xpath(driver, element):
    return driver.execute_script("""
        function getXPath(el) {
            if (el.id !== '') return '//*[@id="' + el.id + '"]';
            if (el === document.body) return '/html/' + el.tagName;
            var ix = 0;
            var siblings = el.parentNode.childNodes;
            for (var i = 0; i < siblings.length; i++) {
                var sibling = siblings[i];
                if (sibling === el) return getXPath(el.parentNode) + '/' + el.tagName + '[' + (ix + 1) + ']';
                if (sibling.nodeType === 1 && sibling.tagName === el.tagName) ix++;
            }
        }
        return getXPath(arguments[0]);
    """, element)

# Extract XPaths for categorized elements
def extract_xpaths(url):
    driver = webdriver.Chrome()
    driver.get(url)

    extracted_xpaths = {category: [] for category in ELEMENT_CATEGORIES.keys()}

    for category, selectors in ELEMENT_CATEGORIES.items():
        for selector in selectors:
            try:
                elements = driver.find_elements(By.XPATH, f"//{selector}")
                for element in elements:
                    xpath = generate_xpath(driver, element)
                    extracted_xpaths[category].append(xpath)
            except:
                continue

    driver.quit()

    # Save to JSON
    with open("extracted_xpaths.json", "w") as file:
        json.dump(extracted_xpaths, file, indent=4)

    print("\n✅ Extracted XPaths saved to 'extracted_xpaths.json'.")

# Read requirements from JSON
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

# Flask route to trigger XPath extraction
@app.route('/test', methods=['GET'])
def run_extract():
    try:
        subprocess.run(["python", "app4.py"], check=True)
        return jsonify({"message": "Testcases successfully executed!"}), 200
    except Exception as e:
        return jsonify({"message": "Error during extraction or app3.py execution", "error": str(e)}), 500

# Run the Flask server
if __name__ == '__main__':
    print("🚀 Starting Flask server...")
    app.run(debug=True, port=5000)
