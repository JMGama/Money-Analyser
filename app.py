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
visual_recognition = None
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
            url=vrec_url,
            iam_api_key=vrec_api_key)

# On IBM Cloud Cloud Foundry, get the port number from the environment variable PORT
# When running this app on the local machine, default the port to 8000
port = int(os.getenv('PORT', 8000))


@app.route('/')
def root():
    """Video streaming home page."""
    return render_template('index.html')


@app.route('/analyse_image', methods=['POST'])
def analyse_image():
    """Capture de image to then send it to analyse"""
    image = request.files['webcam']
    image.save(os.path.join('images/', 'image.jpg'))

    with open('./images/image.jpg', 'rb') as image_file:
        classes = visual_recognition.classify(
            image_file,
            threshold='0.6',
            classifier_ids='billetes_1956479900'
        )
    # classes = {'images': [{'image': './images/image.jpg', 'classifiers': [{'classes': [{'score': 0.646, 'class': 'quinientos'}],
    #                                                                        'classifier_id': 'billetes_1956479900', 'name': 'billetes'}]}], 'custom_classes': 6, u'images_processed': 1}

    image_classes = classes['images'][0]['classifiers'][0]['classes'][0]
    result_class = image_classes['class']
    print(image_classes)

    if result_class == 'veinte':
        result = '20'
    elif result_class == 'cincuenta':
        result = '50'
    elif result_class == 'cien':
        result = '100'
    elif result_class == "doscientos":
        result = '200'
    elif result_class == "quinientos":
        result = '500'
    elif result_class == "mil":
        result = '1000'

    money = '/send_message/' + result

    return money


@app.route('/send_message/<money>')
def send_message(money):

    if money == '20':
        message = "Jmm! $20<br>pesos, estaria<br>bien comprar<br>un gansito"
    elif money == '50':
        message = "Veo que tienes!<br>$50 pesos,<br>en que lo<br>planeas usar?"
    elif money == '100':
        message = "Wow!<br>$100 pesos,<br>no me quieres<br>invitar un cafe?"
    elif money == "200":
        message = "Wow! $200<br>pesos, conozco<br>buenas promos<br>en el oxxo."
    elif money == "500":
        message = "Bien! $500<br>pesos, deberias<br>invertirlo<br>en algo util."
    elif money == "1000":
        message = "Increible! $1000<br>pesos, no<br>todos los dias<br>veo algo asi?"

    content = {
        'message': message
    }
    return render_template('index.html', **content)


@atexit.register
def shutdown():
    if client:
        client.disconnect()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
