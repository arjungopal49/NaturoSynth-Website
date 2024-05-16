from flask import Flask, jsonify
app = Flask(__name__)

# sample
@app.route('/api/data')
def get_data():
    data = fetch_data() # imaginary function
    return jsonify(**data)

if __name__ == '__main__':
    app.run(debug=True)