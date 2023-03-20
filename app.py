from flask import Flask, render_template

app = Flask(__name__, template_folder='graduation', static_folder='css')

@app.route('/')
def index():
    return render_template('/index.html')

@app.route('/about')
def about():
    return 'This is the about page'

@app.route('/<path:path>')
def catch_all(path):
    return render_template(path)

if __name__ == '__main__':
    app.run(debug=True, port=8080)