from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def run_extract():
    subprocess.run(['python', 'extract.py'], capture_output=False)
        
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
