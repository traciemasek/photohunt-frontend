document.addEventListener("DOMContentLoaded", e => {

  const photoContainer = document.getElementById("photo-container")

  photoContainer.addEventListener("click", e=>{

    console.log(e.target.className)
    console.log(e.clientX)
    console.log(e.clientY)

    if (e.target.className === "invisible") {
      let targetId = e.target.id;
      console.log(targetId)
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
      targetDiv.innerHTML = `<img class="circle" src="assets/Circle-PNG-Pic.png">`;
      correspondingDiv.innerHTML = `<img class="circle" src="assets/Circle-PNG-Pic.png">`;
      
    }
  })







})