let teamScores = [0, 0];
let key = "scores"

function addPoints1(index) {
  teamScores[index]++;
  saveScore();
}

function addPoints3(index) {
  teamScores[index] += 3;
  saveScore();
}

function addPoints6(index) {
  teamScores[index] += 6;
  saveScore();
}

function minusPoints1(index) {
  if (teamScores[index] >= 1) {
    teamScores[index]--;
  } else {
    teamScores[index] = 0;
  }
  saveScore();
}

function minusPoints3(index) {
  if (teamScores[index] >= 3) {
    teamScores[index] -= 3;
  } else {
    teamScores[index] = 0;
  }
  saveScore();
}

function minusPoints6(index) {
  if (teamScores[index] >= 6) {
    teamScores[index] -= 6;
  } else {
    teamScores[index] = 0;
  }
  saveScore();
}

function saveScore() {
  window.localStorage.setItem("scores", JSON.stringify(teamScores));
  drawScore()
}

function loadScore() {
  let storedScores = window.localStorage.getItem(key)
  console.log(storedScores);
  if (storedScores) {
    let scores = JSON.parse(storedScores);
    teamScores = scores
  }
}

function drawScore() {
  let scoreListElement = document.getElementById("scores")
  let scoresTemplate = ""
  console.log("------------------------------")
  for (let i = 0; i < teamScores.length; i++) {
    scoresTemplate += `
    <div class="mx-4 d-flex flex-column align-items-center special-width">
      <h1>Player ${(i+1)}</h1>
      <h4>Score: ${teamScores[i]}</h4>
    </div>
    `
    console.log("player: " + (i+1) + ", Score: " + teamScores[i])
  }
  console.log("------------------------------")
  if (scoreListElement && scoresTemplate != ``) {
    scoreListElement.innerHTML = scoresTemplate
  }

  // ----------------------------------------------------------------

  let buttonListElement = document.getElementById("buttons")
  let buttonsTemplate = ""

  for (let i = 0; i < teamScores.length; i++) {
    buttonsTemplate += `
    <div class="d-flex flex-column mx-4 special-width">
      <button onclick="addPoints6(${i})" class="btn btn-info my-2">Player ${(i+1)}: +6</button>
      <button onclick="addPoints3(${i})" class="btn btn-info my-2">Player ${(i+1)}: +3</button>
      <button onclick="addPoints1(${i})" class="btn btn-info my-2">Player ${(i+1)}: +1</button>
      <button onclick="minusPoints1(${i})" class="btn btn-info my-2">Player ${(i+1)}: -1</button>
      <button onclick="minusPoints3(${i})" class="btn btn-info my-2">Player ${(i+1)}: -3</button>
      <button onclick="minusPoints6(${i})" class="btn btn-info my-2">Player ${(i+1)}: -6</button>
    </div>
    `
  }

  if (buttonListElement && buttonsTemplate != ``) {
    buttonListElement.innerHTML = buttonsTemplate
  }
  
  // ----------------------------------------------------------------

  let totalListElement = document.getElementById("total")
  let totals = 0;
  for (let i = 0; i < teamScores.length; i++) {
    totals += teamScores[i]
  }
  let totalsTemplate = `
  <h1>Total Score: ${totals}</h1>
  `; 
  if (totalListElement && totalsTemplate != ``) {
    totalListElement.innerHTML = totalsTemplate
  }
}

function resetScore() {
  for (let i = 0; i < teamScores.length; i++) {
    teamScores[i] = 0;
  }
  saveScore()
}

function addPlayer() {
  if (teamScores.length < 8) {
    teamScores.push(0);
    saveScore();
  }
}

function removePlayer() {
  if (teamScores.length > 2) {
    console.log("Player: " + (teamScores.length) + " was removed, and had a score of: " + teamScores.pop());
    saveScore();
  }
}

loadScore()
drawScore()