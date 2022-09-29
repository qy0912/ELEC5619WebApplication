import re
from flask import *
from api import process


app = Flask(__name__)


@app.route('/dolars')
def hello():
    if request.method == 'GET':
        return {'response' :'Alive'}
    elif request.method == 'POST':
        words = request.form.get('words')
        return {'response' : words + ' My response'}
if __name__ == "__main__":
    app.run()