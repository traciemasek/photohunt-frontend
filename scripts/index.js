document.addEventListener("DOMContentLoaded", e => { 

  const scenes = [
    {
      scene: "https://image.apost.com/media/articletranslation/2017/09/19/14/ed4dfb369b7f2126633a078b92b03660_500x1.jpg",
      css: "styles/image_1.css"
    },
    {
      scene: "assets/scenes/14-ramsay.jpg",
      css: "styles/ramsay.css"
    },
    { scene: "assets/scenes/2-cowboy.jpg", 
      css: "styles/cowboy.css"
    }];  

  let usedIndexes = [];

  let randomScene; 
  let sceneImgSrc;
  let sceneCssHref;

  let username;
  let highScore;

  const photoContainer = document.getElementById("photo-container");
  const topContainer = document.getElementById("top-container");
  const timerButton = topContainer.querySelector("button"); //this is the fake button to start the timer
  const footer = document.getElementById("footer");
  const timerBar = document.getElementById("timer-buttons")
  // CSS HEAD STUFF
  const head = document.querySelector("head")
  const cssLink = head.querySelector("#circles")

  let sec;
  let timer;
  let correctCount = 0;

  //NOTES scope of sceneImgSrc issue with the randomScene stuff--removed the img tag and now loading it in startGame()
  // <img src=${sceneImgSrc}>
  let sceneHTML = `
    <div id="butt1L" class="invisible"></div>
    <div id="butt1R" class="invisible"></div>
    <div id="butt2L" class="invisible"></div>
    <div id="butt2R" class="invisible"></div>
    <div id="butt3L" class="invisible"></div>
    <div id="butt3R" class="invisible"></div>
    <div id="butt4L" class="invisible"></div>
    <div id="butt4R" class="invisible"></div>
    <div id="butt5L" class="invisible"></div>
    <div id="butt5R" class="invisible"></div>
    <div id="butt6L" class="invisible"></div>
    <div id="butt6R" class="invisible"></div>
  `

  //on page load functions here
  kenny();
  newTimerButtons();
  newCorrectCircles();

 
  function newTimerButtons() {
    timerBar.innerHTML = `
      <img class="red oval" id="oval0" src="assets/redOval.png">
      <img class="red oval" id="oval2" src="assets/redOval.png">
      <img class="red oval" id="oval4" src="assets/redOval.png">
      <img class="yellow oval" id="oval6" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval8" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval10" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval12" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval14" src="assets/yellowOval.png">
      <img class="green oval" id="oval16" src="assets/yellowOval.png">
      <img class="green oval" id="oval18" src="assets/greenOval.png">
      <img class="green oval" id="oval20" src="assets/greenOval.png">
      <img class="green oval" id="oval22" src="assets/greenOval.png">
      <img class="green oval" id="oval24" src="assets/greenOval.png">
      <img class="green oval" id="oval26" src="assets/greenOval.png">
      <img class="green oval" id="oval28" src="assets/greenOval.png">
      <img class="green oval" id="oval30" src="assets/greenOval.png">
      <img class="green oval" id="oval32" src="assets/greenOval.png">
      <img class="green oval" id="oval34" src="assets/greenOval.png">
      <img class="green oval" id="oval36" src="assets/greenOval.png">
      <img class="green oval" id="oval38" src="assets/greenOval.png">
      <img class="clock" id="clock" src="assets/clock.png">
    `
  } //end of newTimerButtons()

  function newCorrectCircles() {
    footer.innerHTML = `
    <img class="grey-circle" id="circle1" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle2" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle3" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle4" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle5" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle6" src="assets/greyCircle.png">
    `
  }

  function kenny(){
    const formHTML =  `
    <form class="login">
      Enter a username! <br>
      <input type="text" name="username" placeholder="Enter a username"> <br>
      <input type="submit" value="Giddy up!" id="giddyup" class="glass">
    </form>`
    photoContainer.innerHTML = formHTML

    photoContainer.addEventListener("submit", event => {
      event.preventDefault()
      if (event.target.tagName === "FORM") {
        username = event.target.username.value
        
        photoContainer.innerHTML = `
          <h1>Welcome to Name of Our Game, ${username}!</h1>
          <p>You'll be shown two photos with 6 differences. Click on the differences before the time runs out. If you click the wrong thing, you lose points. Don't be a loser!</p>
          <button id="start">START</button>
          `

        const startButton = document.querySelector("#start")
        startButton.addEventListener("click", event => {
          startGame()
        })
      }
    })
  } //end of loggins

  function startGame() {
    //assign random scene info to variables
    randomScene = getRandomScene();
    sceneImgSrc = randomScene.scene;
    sceneCssHref = randomScene.css;
    //set the HTML & CSS
    photoContainer.innerHTML = `<img src=${sceneImgSrc}> ${sceneHTML}`;
    cssLink.href = sceneCssHref; 
    startTimer()
  }

  function restartGame() {
    usedIndexes = [];
    newTimerButtons();
    newCorrectCircles();
    randomScene = getRandomScene();
    sceneImgSrc = randomScene.scene;
    sceneCssHref = randomScene.css;
    //set the HTML & CSS
    photoContainer.innerHTML = `<img src=${sceneImgSrc}> ${sceneHTML}`;
    cssLink.href = sceneCssHref; 
    startTimer()
  }

  function nextRound() {
    correctCount = 0
    timerBar.innerHTML = ""
    newTimerButtons();
    newCorrectCircles();
    startGame();
  }

  //timer
  function startTimer() {
    sec = 40;
    timer = setInterval(() => {
      sec --;
      timerButton.innerText = sec;
      let timerDots = timerBar.querySelectorAll(".oval")
      timerDots.forEach(dot => {
        if (dot.id === `oval${sec}`) {
          dot.src = "assets/greyOval.png"
        }
      })
      
      if (sec < 0) { 
        clearInterval(timer);
        timesUp();
      } 
    }, 1000)
  }

  function timesUp() {
    clearInterval(timer);
    sec = 40;
    timerBar.innerHTML = "<div>Time's up!!! GAME OVER</div>"
    //TO DO: post user score
    // add button to start new game or exit
    const invisibleDivs = photoContainer.querySelectorAll(".invisible")
    const greyCircles = footer.querySelectorAll(".grey-circle")
    invisibleDivs.forEach(invisibleDiv => {
      invisibleDiv.className = "gameOverCircle";
      invisibleDiv.innerHTML = `<img class="circle" src="assets/redcircle.png">`;
    })
    greyCircles.forEach(greyCircle => {
      greyCircle.src = src="assets/greyCircleRedCheck.png"
    })
  }

  
  //photo click
  photoContainer.addEventListener("click", e=>{
    let score = parseInt(document.getElementById("my-score").innerText); 

    if (e.target.className === "invisible") {
      let targetId = e.target.id;
      let targetDiv = document.getElementById(targetId);
      let correspondingDiv;
      let correspendingId;
      if (targetId.includes("L") ){
        correspendingId = targetId.replace("L", "R")
        correspondingDiv = document.getElementById(correspendingId)
      } else {
        correspendingId = targetId.replace("R", "L")
        correspondingDiv = document.getElementById(correspendingId)
      }
      //update class & add image of circle
      targetDiv.className = "cicle";
      correspondingDiv.className = "circle";
      targetDiv.innerHTML = `<img class="circle" src="assets/greencircle.png">`;
      correspondingDiv.innerHTML = `<img class="circle" src="assets/greencircle.png">`;
      document.getElementById("my-score").innerText = score += 100
      //counter at bottom
      correctCount++;
      let currentCircle = document.getElementById(`circle${correctCount}`)
      currentCircle.src = "assets/greyCircleGreenCheck.png";
      currentCircle.className = "green-check"
      
      //win the round
      if (correctCount === 6) {
        //sleep
        clearInterval(timer);

        //*************
        //*************TO DO: 
        //add if usedIndexes.length === scenes.length you win the whole game

        timerBar.innerHTML = `<h1>Great job!</h1> <button id="new-round">Start new round</button>`
        const newRoundButton = document.getElementById("new-round")
        newRoundButton.addEventListener("click", event => {
          //starting a new round needs to reset the correctCount, clear the timerBar & add back in the dots, reset the correct circles
          //: reset the randomScene to one that hasn't been played yet (based on array of used indexes--probably a better way)
          //load the new scene into photo container, update css link in head, start timer (these are all in the startGame function)

          correctCount = 0
          // timerBar.innerHTML = ""
          newTimerButtons();
          newCorrectCircles();
          startGame();

          // nextRound();
        
        })
      }

    } else {
      if (sec < 40 && sec > 0) {
       document.getElementById("my-score").innerText = score -=50 
      }
    }
  })

  //helper functions
  function getRandomScene() {
    let i = Math.floor(Math.random()*scenes.length)
    if (usedIndexes.includes(i)) {
      console.log("index was already in usedIndexes, trying to search again")
      getRandomScene();
    } else {
    usedIndexes.push(i) 
    console.log(scenes[i])
    console.log(`used indexes = ${usedIndexes} and i = ${i}`)
    return scenes[i]
    }
  }


  //FETCH functions
  
  //post userscore
  // function postScore(body) {
  //   return fetch()
  // }



})