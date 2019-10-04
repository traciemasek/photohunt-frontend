document.addEventListener("DOMContentLoaded", e => { 

  let scenes = [
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
  // scenes will be an array of objects with the image file path and css file path (maybe)
  let username;
  let highScore;

  const photoContainer = document.getElementById("photo-container");
  const topContainer = document.getElementById("top-container");
  const timerButton = topContainer.querySelector("button"); //this is the fake button to start the timer
  const footer = document.getElementById("footer");
  const timerBar = document.getElementById("timer-buttons")
  // HEAD CSS STUFF
  const head = document.querySelector("head")
  const cssLink = head.querySelector("#circles")

  let sec;
  let correctCount = 0;

  const sceneHTML = `
    <img src="assets/scenes/NAME.jpg">
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
  const cssHref = `styles/vapormatt.css`

  //on page load functions here
  kenny()
  newTimerButtons()
 
  function newTimerButtons() {
    timerBar.insertAdjacentHTML("afterbegin", `
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
    `)
  } //end of newTimerButtons()

  function kenny(){
    
          startGame()
  
  } //end of loggins

  function startGame() {
    photoContainer.innerHTML = sceneHTML
    cssLink.href = cssHref
    //start timer

    //begin score keeping
  }

  //timer
  function timer() {
    sec = 40;
    let timer = setInterval(() => {
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
      } //elsif to clear interval on timer if they win the round???
    }, 1000)
  }

  function timesUp() {
    clearInterval(timer);
    sec = 40;
    timerBar.innerHTML = "<div>Time's up!!! GAME OVER</div>"
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

    console.log(`X LEFT = ${e.clientX - 40}, Y TOP = ${e.clientY - 180}`)
    // let score = parseInt(document.getElementById("my-score").innerText); 

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
      //add logic if they get all 6 before times up
      correctCount++;
      let currentCircle = document.getElementById(`circle${correctCount}`)
      currentCircle.src = "assets/greyCircleGreenCheck.png";
      currentCircle.className = "green-check"
      
    //   if (correctCount === 6) {
    //     //sleep
    //     //clear interval
    //     clearInterval(timer);
    //     //reset timer to zero
    //     sec = 0;
    //     //alert user they won and button to start next round
    //     timerBar.innerHTML = `<h1>Great job!</h1> <button>Start new round</button>`
    //     //event listener on start new round and make start new round function (reset timer button, start timer, )
    //   }

    // } else {
    //   if (sec < 40 && sec > 0) {
    //    document.getElementById("my-score").innerText = score -=50 
    //   }
    }
  })

  //helper functions
  function getRandomScene(scenes) {
    return scenes[Math.floor(Math.random()*scenes.length)]
  }





})