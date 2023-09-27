// Game Settings
let gameState = {
  score: 0,
  highScore: 0,
  nextProjectile: Math.floor(Math.random() * 4),
  nextProjectileTimer: 0,
  topProjectilesArray: [],
  leftProjectilesArray: [],
  rightProjectilesArray: [],
  bottomProjectilesArray: [],
  shieldDirection: "left",
  isMuted: false,
};

// DOM
const topProjectiles = document.getElementById("top-projectiles");
const leftProjectiles = document.getElementById("left-projectiles");
const rightProjectiles = document.getElementById("right-projectiles");
const bottomProjectiles = document.getElementById("bottom-projectiles");
const leftShield = document.getElementById("left-2");
const score = document.getElementById("current-score");
const highScore = document.getElementById("high-score");
const mute = document.getElementById("mute");
const unmute = document.getElementById("unmute");
unmute.style.display = "none";

// Audio

const gameOver = new Audio("./assets/gameover.wav");
const cNote = new Audio("./assets/sax-short-single-note_C.wav");
const dNote = new Audio("./assets/sax-short-single-note_D.wav");
const eNote = new Audio("./assets/sax-short-single-note_E.wav");
const gNote = new Audio("./assets/sax-short-single-note_G.wav");

// Checking high score from localStorage

let checkStateHighScore = localStorage.getItem("shieldHeroHighScore");

if (checkStateHighScore) {
  gameState.highScore = parseInt(checkStateHighScore);
  highScore.innerHTML = `High Score: ${gameState.highScore}`;
}

// Event Listeners
document.addEventListener("keydown", checkKey);
mute.addEventListener("click", () => {
  mute.style.display = "none";
  gameState.isMuted = true;
  console.log(gameState.isMuted);
  unmute.style.removeProperty("display");
});

unmute.addEventListener("click", () => {
  gameState.isMuted = false;
  console.log(gameState.isMuted);
  unmute.style.display = "none";
  mute.style.removeProperty("display");
});

// allows for web page to not move on key click

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

// Desktop Controls
function checkKey(e) {
  const upShield = document.getElementById("top-2");
  const downShield = document.getElementById("bottom-2");
  const leftShield = document.getElementById("left-2");
  const rightShield = document.getElementById("right-2");

  if (e.key === "ArrowUp") {
    // Up
    gameState.shieldDirection = "up";
    upShield.style.backgroundColor = "gold";
    downShield.style.removeProperty("background-color");
    leftShield.style.removeProperty("background-color");
    rightShield.style.removeProperty("background-color");
  } else if (e.key === "ArrowDown") {
    // Down
    gameState.shieldDirection = "down";
    downShield.style.backgroundColor = "gold";
    upShield.style.removeProperty("background-color");
    leftShield.style.removeProperty("background-color");
    rightShield.style.removeProperty("background-color");
  } else if (e.key === "ArrowLeft") {
    // Left
    gameState.shieldDirection = "left";
    leftShield.style.backgroundColor = "gold";
    downShield.style.removeProperty("background-color");
    upShield.style.removeProperty("background-color");
    rightShield.style.removeProperty("background-color");
  } else if (e.key === "ArrowRight") {
    // Right
    gameState.shieldDirection = "right";
    rightShield.style.backgroundColor = "gold";
    downShield.style.removeProperty("background-color");
    leftShield.style.removeProperty("background-color");
    upShield.style.removeProperty("background-color");
  }
}

// Produces cells for projectiles to flow
function renderProjectileAreas() {
  for (let i = 0; i < 40; i++) {
    //Rendering cells for top projectile flow
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", `top-${i}`);
    topProjectiles.appendChild(cell);

    //Rendering cells for left projectile flow
    const cell2 = document.createElement("div");
    cell2.setAttribute("class", "cell");
    cell2.setAttribute("id", `left-${i}`);
    leftProjectiles.appendChild(cell2);

    //Rendering cells for right projectile flow
    const cell3 = document.createElement("div");
    cell3.setAttribute("class", "cell");
    cell3.setAttribute("id", `right-${i}`);
    rightProjectiles.appendChild(cell3);

    //Rendering cells for bottom projectile flow
    const cell4 = document.createElement("div");
    cell4.setAttribute("class", "cell");
    cell4.setAttribute("id", `bottom-${i}`);
    bottomProjectiles.appendChild(cell4);
  }
}

renderProjectileAreas();
gameReset();

// Game Reset Functionality
function gameReset() {
  const isMuted = gameState.isMuted;

  gameState = {
    score: 0,
    highScore: localStorage.getItem("shieldHeroHighScore"),
    nextProjectile: Math.floor(Math.random() * 4),
    nextProjectileTimer: 1,
    topProjectilesArray: [],
    leftProjectilesArray: [],
    rightProjectilesArray: [],
    bottomProjectilesArray: [],
    shieldDirection: "left",
    isMuted,
  };

  score.innerHTML = "Score: 0";

  for (let i = 0; i < 40; i++) {
    const cell = document.getElementById(`top-${i}`);
    cell.style.removeProperty("background-color");

    const cell2 = document.getElementById(`left-${i}`);
    cell2.style.removeProperty("background-color");

    const cell3 = document.getElementById(`right-${i}`);
    cell3.style.removeProperty("background-color");

    const cell4 = document.getElementById(`bottom-${i}`);
    cell4.style.removeProperty("background-color");
  }

  const leftShield = document.getElementById("left-2");
  leftShield.style.backgroundColor = "gold";
}

// Game Flow
setInterval(() => {
  if (gameState.nextProjectileTimer === 0) {
    if (gameState.nextProjectile === 0) {
      gameState.topProjectilesArray.push("39");
      const cell = document.getElementById("top-39");
      cell.style.backgroundColor = "red";
    }

    if (gameState.nextProjectile === 1) {
      gameState.leftProjectilesArray.push("39");
      const cell = document.getElementById("left-39");
      cell.style.backgroundColor = "red";
    }

    if (gameState.nextProjectile === 2) {
      gameState.rightProjectilesArray.push("39");
      const cell = document.getElementById("right-39");
      cell.style.backgroundColor = "red";
    }

    if (gameState.nextProjectile === 3) {
      gameState.bottomProjectilesArray.push("39");
      const cell = document.getElementById("bottom-39");
      cell.style.backgroundColor = "red";
    }

    gameState.nextProjectileTimer = 6;
    gameState.nextProjectile = Math.floor(Math.random() * 4);
  }

  for (let i = 0; i < gameState.topProjectilesArray.length; i++) {
    if (gameState.topProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `top-${gameState.topProjectilesArray[i]}`
      );
      cell.style.removeProperty("background-color");
      if (gameState.topProjectilesArray[i] === 0) {
        if (!gameState.isMuted) {
          let gameOverClone = gameOver.cloneNode();
          gameOverClone.volume = 0.1;
          gameOverClone.play();
        }
        gameReset();
        break;
      } else if (
        gameState.topProjectilesArray[i] === 2 &&
        gameState.shieldDirection === "up"
      ) {
        gameState.topProjectilesArray.shift();
        gameState.score += 1;
        i--;
        score.innerHTML = `Score: ${gameState.score}`;

        if (!gameState.isMuted) {
          let cClone = cNote.cloneNode();
          cClone.volume = 0.05;
          cClone.play();
        }

        const upShield = document.getElementById("top-2");
        upShield.style.backgroundColor = "gold";
      } else {
        gameState.topProjectilesArray[i]--;
        const cell2 = document.getElementById(
          `top-${gameState.topProjectilesArray[i]}`
        );
        cell2.style.backgroundColor = "red";
      }
    }
  }

  for (let i = 0; i < gameState.leftProjectilesArray.length; i++) {
    if (gameState.leftProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `left-${gameState.leftProjectilesArray[i]}`
      );
      cell.style.removeProperty("background-color");
      if (gameState.leftProjectilesArray[i] === 0) {
        gameReset();
        if (!gameState.isMuted) {
          let gameOverClone = gameOver.cloneNode();
          gameOverClone.volume = 0.1;
          gameOverClone.play();
        }
        break;
      } else if (
        gameState.leftProjectilesArray[i] === 2 &&
        gameState.shieldDirection === "left"
      ) {
        gameState.leftProjectilesArray.shift();
        gameState.score += 1;
        i--;
        score.innerHTML = `Score: ${gameState.score}`;

        if (!gameState.isMuted) {
          let dClone = dNote.cloneNode();
          dClone.volume = 0.05;
          dClone.play();
        }

        const leftShield = document.getElementById("left-2");
        leftShield.style.backgroundColor = "gold";
      } else {
        gameState.leftProjectilesArray[i]--;
        const cell2 = document.getElementById(
          `left-${gameState.leftProjectilesArray[i]}`
        );
        cell2.style.backgroundColor = "red";
      }
    }
  }

  for (let i = 0; i < gameState.rightProjectilesArray.length; i++) {
    if (gameState.rightProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `right-${gameState.rightProjectilesArray[i]}`
      );
      cell.style.removeProperty("background-color");
      if (gameState.rightProjectilesArray[i] === 0) {
        gameReset();
        if (!gameState.isMuted) {
          let gameOverClone = gameOver.cloneNode();
          gameOverClone.volume = 0.1;
          gameOverClone.play();
        }
        break;
      } else if (
        gameState.rightProjectilesArray[i] === 2 &&
        gameState.shieldDirection === "right"
      ) {
        gameState.rightProjectilesArray.shift();
        gameState.score += 1;
        i--;

        if (!gameState.isMuted) {
          let eClone = eNote.cloneNode();
          eClone.volume = 0.05;
          eClone.play();
        }

        score.innerHTML = `Score: ${gameState.score}`;

        const rightShield = document.getElementById("right-2");
        rightShield.style.backgroundColor = "gold";
      } else {
        gameState.rightProjectilesArray[i]--;

        const cell2 = document.getElementById(
          `right-${gameState.rightProjectilesArray[i]}`
        );
        cell2.style.backgroundColor = "red";
      }
    }
  }

  for (let i = 0; i < gameState.bottomProjectilesArray.length; i++) {
    if (gameState.bottomProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `bottom-${gameState.bottomProjectilesArray[i]}`
      );

      cell.style.removeProperty("background-color");
      if (gameState.bottomProjectilesArray[i] === 0) {
        gameReset();
        if (!gameState.isMuted) {
          let gameOverClone = gameOver.cloneNode();
          gameOverClone.volume = 0.1;
          gameOverClone.play();
        }
        break;
      } else if (
        gameState.bottomProjectilesArray[i] === 2 &&
        gameState.shieldDirection === "down"
      ) {
        gameState.bottomProjectilesArray.shift();
        gameState.score += 1;
        i--;

        if (!gameState.isMuted) {
          let gClone = gNote.cloneNode();
          gClone.volume = 0.05;
          gClone.play();
        }

        score.innerHTML = `Score: ${gameState.score}`;

        const downShield = document.getElementById("bottom-2");
        downShield.style.backgroundColor = "gold";
      } else {
        gameState.bottomProjectilesArray[i]--;

        const cell2 = document.getElementById(
          `bottom-${gameState.bottomProjectilesArray[i]}`
        );
        cell2.style.backgroundColor = "red";
      }
    }
  }

  if (gameState.score > gameState.highScore) {
    gameState.highScore = gameState.score;
    highScore.innerHTML = `High Score: ${gameState.highScore}`;
    localStorage.setItem("shieldHeroHighScore", gameState.highScore);
  }

  gameState.nextProjectileTimer--;
}, 60);
