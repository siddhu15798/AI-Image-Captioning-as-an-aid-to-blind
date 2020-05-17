
$(() => {

    const startCameraButton = $('#sCamera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('capture');
    const mainContainer = $('#mainContainer');
    let resultDiv = $('#result');



    // $.get("http://192.168.1.4:8080/shot.jpg", function (data) {
    //     console.log("Data Aya Kya :", data);

    // });


    mainContainer.on("click", () => {
        // console.log("Inside startCameraButton.Click()");
        // // make videoChat visible
        // vChatWindow.show();
        mainContainer.off("click", () => {
            alert("Hat gya Kya ?")
        })


        navigator.webkitGetUserMedia({
            video: true,
        }, function (stream) {

            // attach your own stream
            const videoElement = document.getElementById('videoStream')
            // console.log("videoElement", videoElement);
            videoElement.srcObject = stream;
            videoElement.play()

            // Text to Speech Output
            function textToSpeechOutput(caption) {
                var synth = window.speechSynthesis;
                var utter = new SpeechSynthesisUtterance();
                var textToBeSpoken = caption;

                textToSpeech(textToBeSpoken);
            }


            function textToSpeech(textToBeSpoken) {

                // get all voices that browser offers
                var available_voices = window.speechSynthesis.getVoices();

                // this will hold an english voice
                var english_voice = '';

                // find voice by language locale "en-US"
                // if not then select the first voice
                // console.log("available_voices", available_voices)

                for (var i = 0; i < available_voices.length; i++) {
                    if (available_voices[i].lang === 'en-US') {
                        english_voice = available_voices[i];
                        break;
                    }
                }
                if (english_voice === '')
                    english_voice = available_voices[0];

                // new SpeechSynthesisUtterance object
                var utter = new SpeechSynthesisUtterance();
                utter.rate = 0.9;
                utter.pitch = 0.3;
                utter.text = textToBeSpoken;
                utter.voice = english_voice;

                // event after text has been spoken
                utter.onend = function () {
                    // alert('Speech has finished');
                }
                // speak
                window.speechSynthesis.speak(utter);
            }

            function captureNewImage() {
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                let dataURL = canvas.toDataURL();
                // console.log("DataURL => ", dataURL);

                $.ajax({
                    type: "POST",
                    // contentType: "application/json",
                    url: "/",
                    data: { 'data': dataURL }
                }).done(function (data) {
                    console.log("Generated Caption :", data.caption);
                    textToSpeechOutput(data.caption);
                    resultDiv.append(`<div class="alert alert-info" role="alert">
                                        ${data.caption}
                                    </div>`);
                });

            }

            setInterval(() => {
                captureNewImage();
            }, 7000);

        }, function (err) {
            console.log("Error ->", err)
            // console.log(err)
            // console.log(err)
            // console.log(err)
            // console.log(err)
            // console.log(err)   
            // console.log(err)
        })
    })

})

