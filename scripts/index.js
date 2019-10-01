document.addEventListener("DOMContentLoaded", e => {

  let user;
  let highScore;

  const photoContainer = document.getElementById("photo-container");
  const topContainer = document.getElementById("top-container");
  const timerButton = topContainer.querySelector("button");
  const footer = document.getElementById("footer");
  let sec = 30;
  let correctCount = 0;

  //on page load functions here
    //ask user to sign in or sign up
    //replace username button with start button 
    //clicking start loads picture with clickable buttons and starts timer startRound()

  //timer
  function timer() {
    sec = 30;
    let timer = setInterval(() => {
      timerButton.innerText = `${sec}`
      sec --;
      if (sec < 0) { 
        clearInterval(timer)
        timerButton.innerText = "Time's up!!!"
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
      } //elsif to clear interval on timer if they win the round???
    }, 1000)
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







})