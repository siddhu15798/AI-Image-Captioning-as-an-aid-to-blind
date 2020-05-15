from flask import Flask, render_template, redirect, request, jsonify
import Captions
import json
import base64

app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/", methods=["POST"])
def img():
    if request.method == "POST":

        data_url = request.form['data']
        # print("data_url => ", data_url)
        content = data_url.split(';')[1]
        image_encoded = content.split(',')[1]

        with open("imageToSave.png", "wb") as fh:
            fh.write(base64.decodebytes(image_encoded.encode()))

        path = "imageToSave.png"
        caption = Captions.caption_image(path)

        print("Generated Caption : ")
        print(caption)

        # result = {
        #     "image": path,
        #     "caption": caption
        # }

        return jsonify(
            caption=caption
        )

    # return render_template("index.html", result=json.dumps(result))


if __name__ == "__main__":
    app.run(debug=True, threaded=False)
