from cloudant import Cloudant
from flask import Flask, render_template, request, jsonify, Response, redirect
from watson_developer_cloud import VisualRecognitionV3

import atexit
import os
import json

app = Flask(__name__, static_url_path='')

db_name = 'mydb'
client = None
db = None
vrec_api_key = None
vrec_url = None

# Loading all the credentials from the IBM services
# Take them from local file or from the environment variables
if 'VCAP_SERVICES' in os.environ:
    vcap = json.loads(os.getenv('VCAP_SERVICES'))
    print('Found VCAP_SERVICES')
    if 'cloudantNoSQLDB' in vcap:
        creds_cloudant = vcap['cloudantNoSQLDB'][0]['credentials']
        user = creds_cloudant['username']
        password = creds_cloudant['password']
        url = 'https://' + creds_cloudant['host']
        client = Cloudant(user, password, url=url, connect=True)
        db = client.create_database(db_name, throw_on_exists=False)

    if 'watson_vision_combined' in vcap:
        creds_watson_vision = vcap['watson_vision_combined'][0]['credentials']
        vrec_api_key = creds_watson_vision['apikey']
        vrec_url = creds_watson_vision['url']
        visual_recognition = VisualRecognitionV3(
            version='2018-03-19',
            url=vrec_url,
            iam_api_key=vrec_api_key)

elif os.path.isfile('vcap-local.json'):
    with open('vcap-local.json') as f:
        vcap = json.load(f)
        print('Found local VCAP_SERVICES')
        creds_cloudant = vcap['services']['cloudantNoSQLDB'][0]['credentials']
        user = creds_cloudant['username']
        password = creds_cloudant['password']
        url = 'https://' + creds_cloudant['host']
        client = Cloudant(user, password, url=url, connect=True)
        db = client.create_database(db_name, throw_on_exists=False)

        creds_watson_vision = vcap['services']['watson_vision_combined'][0]['credentials']
        vrec_api_key = creds_watson_vision['apikey']
        vrec_url = creds_watson_vision['url']
        visual_recognition = VisualRecognitionV3(
            version='2018-03-19',
            url='https://gateway.watsonplatform.net/visual-recognition/api',
            api_key=vrec_api_key)

# On IBM Cloud Cloud Foundry, get the port number from the environment variable PORT
# When running this app on the local machine, default the port to 8000
port = int(os.getenv('PORT', 8000))


@app.route('/')
def root():
    """Video streaming home page."""
    return render_template('index.html')


@app.route('/analyse_image', methods=['GET', 'POST'])
def analyse_image():
    """Capture de image to then send it to analyze"""
    image = request.files['webcam']
    image.save(os.path.join('images/', 'image.jpg'))

    with open('./images/image.jpg', 'rb') as image_file:
        classes = visual_recognition.classify(
            image_file,
            threshold='0.6',
            classifier_ids='Bills_968841998'
        )
        print(json.dumps(classes, indent=2))

    return render_template('index.html')


@atexit.register
def shutdown():
    if client:
        client.disconnect()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
