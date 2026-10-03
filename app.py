from flask import Flask, render_template, request, jsonify
from log_analyzer import analyze_log

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    text = data.get("text", "")

    result = analyze_log(text)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)