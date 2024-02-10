/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const audioPlayer = document.getElementById("audioPlayer");

  let mediaRecorder;
  let audioChunks = [];

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = function () {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayer.src = audioUrl;
      };

      startBtn.addEventListener("click", function () {
        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
      });

      stopBtn.addEventListener("click", function () {
        mediaRecorder.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
      });
    })
    .catch(function (err) {
      console.error("Error accessing microphone:", err);
    });
});
