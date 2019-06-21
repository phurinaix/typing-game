"use strict"
var article = document.querySelector("#article");
var dialogGuide = document.querySelector("#dialog_guide");
var articles = Array.of();
var boxContainer = document.querySelector(".box_container");
var box = document.querySelector("#box");
var greatMsg = document.querySelector("#great_message");
var userInputContainer = document.querySelector("#user_input_container");
var userInput = document.querySelector("#user_input");
var wpmResult = document.querySelector("#wpm");
var wpm = 0;
var isFirstTime = true;
var timeStart;
var currentIndex = 0;
var boxContainerRealWidth = ((boxContainer.clientWidth - box.clientWidth) * 100) / boxContainer.clientWidth;
const http = new XMLHttpRequest();

http.onreadystatechange = function () {
  if (http.readyState == 4 && http.status == 200) {
    articles = JSON.parse(http.response);
    console.log(JSON.parse(http.response));
    var index = Math.floor(Math.random() * articles.length);
    article.innerHTML = articles[index]["article"];
    var word = articles[index]["article"].split(" ");
    // console.log(word.length);
    userInput.addEventListener("keyup", function (event) {
      if (isFirstTime) {
        timeStart = new Date().getTime();
        isFirstTime = false;
      }
      if (currentIndex < word.length - 1) {
        if (event.target.value === word[currentIndex] + " ") {
          wpm = parseInt((currentIndex + 1) * 60 / ((currentTime() - timeStart) / 1000));
          wpmResult.innerHTML = wpm + " wpm";
          userInput.value = "";
          box.style.left = `${((currentIndex + 1) * boxContainerRealWidth) / word.length}%`;
          currentIndex++;
        }
      } else {
        if (event.target.value === word[currentIndex]) {
          wpm = parseInt((currentIndex + 1) * 60 / ((currentTime() - timeStart) / 1000));
          wpmResult.innerHTML = wpm + " wpm";
          userInput.value = "";
          box.style.left = `${((currentIndex + 1) * boxContainerRealWidth) / word.length}%`;
          currentIndex++;
          // userInput.style.display = 'none';
          userInputContainer.style.display = 'none';
          article.style.display = 'none';
          greatMsg.style.display = 'block';
        }
      }
    });
  }
}

http.open("GET", "/api/articles", true);
http.send();
var currentTime = () => new Date().getTime();

document.querySelector("#guid_btn").addEventListener("click", function() {
  dialogGuide.showModal();
  // alertMsg.innerHTML = "Article must be filled out";
  //       dialog.showModal();
});