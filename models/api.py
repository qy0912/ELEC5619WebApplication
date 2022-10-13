import re
from flask import *
import nlp

app = Flask(__name__)


@app.route('/dolars', methods =['GET', 'POST'])
def hello():

    if request.method == 'GET':
        return {'response' :nlp.process(['hello'])}
    elif request.method == 'POST':
        words = request.form.get('words')
        if words:
            return {'response' : nlp.process([words])}
        return "none"
if __name__ == "__main__":
    app.run()