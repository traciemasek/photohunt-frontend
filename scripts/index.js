document.addEventListener("DOMContentLoaded", e => { 

  let scenes = ["https://image.apost.com/media/articletranslation/2017/09/19/14/ed4dfb369b7f2126633a078b92b03660_500x1.jpg", "assets/scenes/2-cowboy.jpg", "assets/scenes/14-ramsay.jpg"];
  // scenes will be an array of objects with the image file path and css file path (maybe)
  let username;
  let highScore;

  const photoContainer = document.getElementById("photo-container");
  const topContainer = document.getElementById("top-container");
  const timerButton = topContainer.querySelector("button"); //this is the fake button to start the timer
  const footer = document.getElementById("footer");
  const timerBar = document.getElementById("timer-buttons")
  const GameOverDiv = document.getElementById("game-over")
  let sec = 40;
  let correctCount = 0;

  const sceneHTML = `
    <img src="${getRandomScene(scenes)}">
    <div id="butt1L" class="invisible"></div>
    <div id="butt1R" class="invisible"></div>
    <div id="butt2L" class="invisible"></div>
    <div id="butt2R" class="invisible"></div>
    <div id="butt3L" class="invisible"></div>
    <div id="butt3R" class="invisible"></div>
  `

  //on page load functions here
  kenny()
  newTimerButtons()
    //ask user to sign in or sign up
    //replace username button with start button 
    //clicking start loads picture with clickable buttons and starts timer startRound()
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
    const formHTML =  `
    <form class="login">
      Enter a username!
      <input type="text" name="username" placeholder="Enter a username">
      <input type="submit" value="Giddy up!">
    </form>`
    photoContainer.innerHTML = formHTML

    photoContainer.addEventListener("submit", event => {
      event.preventDefault()
      if (event.target.tagName === "FORM") {
        username = event.target.username.value
        
        photoContainer.innerHTML = `
          <h1>Welcome to Name of Our Game, ${username}!</h1>
          <p>You'll be shown two photos with 6 differences. Click on the differences before the time runs out. If you the wrong thing, you lose points. Don't be a loser!</p>
          <button id="start">START</button>
          `

        const startButton = document.querySelector("#start")
        startButton.addEventListener("click", event => {
          //start game function
          startGame()
        })
      }
    })
  } //end of loggins

  function startGame() {
    //load photo
    photoContainer.innerHTML = sceneHTML
    //start timer
    //begin score keeping
  }

  //timer
  function timer() {
    let timer = setInterval(() => {
      timerButton.innerText = `${sec}`
      sec --;
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
    timerButton.innerText = "Time's up!!!"
    // GameOverDiv.innerText = "GAME OVER!"
    const invisibleDivs = photoContainer.querySelectorAll(".invisible")
    const greyCircles = footer.querySelectorAll(".grey-circle")
    invisibleDivs.forEach(invisibleDiv => {
      invisibleDiv.className = "gameOverCircle";
      invisibleDiv.innerHTML = `<img class="circle" src="assets/redcircle.png">`;
    })
    greyCircles.forEach(greyCircle => {
      greyCircle.src = src="assets/greyCircleRedCheck.png"
    })
    //also replace image in image container with GAME OVER
  }

  timerButton.addEventListener("click", event => {
    timer();
  })
  
  
  
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
      //add logic if they get all 6 before times up
      correctCount++;
      let currentCircle = document.getElementById(`circle${correctCount}`)
      currentCircle.src = "assets/greyCircleGreenCheck.png";
      currentCircle.className = "green-check"
      
    } else {
      document.getElementById("my-score").innerText = score -=50
    }
  })

  //helper functions
  function getRandomScene(scenes) {
    return scenes[Math.floor(Math.random()*scenes.length)]
  }





})