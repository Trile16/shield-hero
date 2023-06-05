const gameState = {
  score: 0,
  nextProjectile: Math.floor(Math.random() * 4),
  nextProjectileTimer: 0,
  topProjectilesArray: [],
  leftProjectilesArray: [],
  rightProjectilesArray: [],
  bottomProjectilesArray: [],
};

const topProjectiles = document.getElementById("top-projectiles");
const leftProjectiles = document.getElementById("left-projectiles");
const rightProjectiles = document.getElementById("right-projectiles");
const bottomProjectiles = document.getElementById("bottom-projectiles");

function renderProjectileAreas() {
  //Rendering cells for top projectile flow
  for (let i = 0; i < 40; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", `top-${i}`);
    cell.style.outline = "solid 1px black";
    topProjectiles.appendChild(cell);
  }

  //Rendering cells for left projectile flow
  for (let i = 0; i < 40; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", `left-${i}`);
    cell.style.outline = "solid 1px black";
    leftProjectiles.appendChild(cell);
  }

  //Rendering cells for right projectile flow
  for (let i = 0; i < 40; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", `right-${i}`);
    cell.style.outline = "solid 1px black";
    rightProjectiles.appendChild(cell);
  }

  //Rendering cells for bottom projectile flow
  for (let i = 0; i < 40; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", `bottom-${i}`);
    cell.style.outline = "solid 1px black";
    bottomProjectiles.appendChild(cell);
  }
}

renderProjectileAreas();

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
      console.log(gameState.topProjectilesArray[i]);
      cell.style.removeProperty("background-color");
      gameState.topProjectilesArray[i]--;
      console.log(gameState.topProjectilesArray[i]);
      const cell2 = document.getElementById(
        `top-${gameState.topProjectilesArray[i]}`
      );
      cell2.style.backgroundColor = "red";
    }
  }

  for (let i = 0; i < gameState.leftProjectilesArray.length; i++) {
    if (gameState.leftProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `left-${gameState.leftProjectilesArray[i]}`
      );
      console.log(gameState.leftProjectilesArray[i]);
      cell.style.removeProperty("background-color");
      gameState.leftProjectilesArray[i]--;
      console.log(gameState.leftProjectilesArray[i]);
      const cell2 = document.getElementById(
        `left-${gameState.leftProjectilesArray[i]}`
      );
      cell2.style.backgroundColor = "red";
    }
  }

  for (let i = 0; i < gameState.rightProjectilesArray.length; i++) {
    if (gameState.rightProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `right-${gameState.rightProjectilesArray[i]}`
      );
      console.log(gameState.rightProjectilesArray[i]);
      cell.style.removeProperty("background-color");
      gameState.rightProjectilesArray[i]--;
      console.log(gameState.rightProjectilesArray[i]);
      const cell2 = document.getElementById(
        `right-${gameState.rightProjectilesArray[i]}`
      );
      cell2.style.backgroundColor = "red";
    }
  }

  for (let i = 0; i < gameState.bottomProjectilesArray.length; i++) {
    if (gameState.bottomProjectilesArray[i] >= 0) {
      const cell = document.getElementById(
        `bottom-${gameState.bottomProjectilesArray[i]}`
      );
      console.log(gameState.bottomProjectilesArray[i]);
      cell.style.removeProperty("background-color");
      gameState.bottomProjectilesArray[i]--;
      console.log(gameState.bottomProjectilesArray[i]);
      const cell2 = document.getElementById(
        `bottom-${gameState.bottomProjectilesArray[i]}`
      );
      cell2.style.backgroundColor = "red";
    }
  }

  gameState.nextProjectileTimer--;
}, 300);
