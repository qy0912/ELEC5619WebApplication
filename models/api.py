import re
from flask import *


app = Flask(__name__)


@app.route('/dolars', methods =['GET', 'POST'])
def hello():

    if request.method == 'GET':
        return {'response' :'Alive'}
    elif request.method == 'POST':
        
        words = request.form.get('words')
        print(request.form)
        if words:
            return {'response' : words + ' My response'}
        return "none"
if __name__ == "__main__":
    app.run()