let plays = [];
let plaeysPlays = [];
let maxLevel = 100;
let speed = 600;
let level = 1;
let colors = ["red", "yellow", "green", "blue"];
function playGame(color) {
  const colorFind = plaeysPlays.shift();
  if (level == maxLevel) {
    resetGame();
    printColors();
    nextPlay();
  } else if (colorFind.trim() === color.trim()) {
    plaeysPlays.unshift();
    if (plaeysPlays.length == 0) {
      level++;
      setTimeout(() => {
        document.getElementById(
          "level"
        ).innerText = `Nivel ${level} de ${maxLevel}`;
        nextPlay();
      }, 1000);
    }
  } else if (plaeysPlays.length > 0) {
    document.getElementById("level").innerText = `Error `;
    resetGame();
    setTimeout(() => {
      document.getElementById(
        "level"
      ).innerText = `Nivel ${level} de ${maxLevel}`;
      nextPlay();
    }, 1000);
  } else {
    level++;
    setTimeout(() => {
      document.getElementById(
        "level"
      ).innerText = `Nivel ${level} de ${maxLevel}`;
      nextPlay();
    }, 1000);
  }
}

function resetGame() {
  plaeysPlays = [];
  level = 1;
  plays = [];
}

function start(event) {
  event.target.style.display = "none";
  document.getElementById("board").style.display = "flex";
  document.getElementById("level").style.display = "block";
  printColors();
  nextPlay();
}

function nextPlay() {
  if (level === 15 || level === 20) {
    colors.push("teal");
    colors.push("Salmon");
    printColors();
  } else if (level === 10) {
    speed = speed - 200;
  } else if (level > 1) {
    speed++;
  }
  let color = colors[Math.floor(Math.random() * colors.length)];
  plays.push(color);
  plaeysPlays = [...plays];
  document.getElementById("board").classList.add("unclickable");
  bucle();
  document.getElementById("board").classList.remove("unclickable");
}

function bucle() {
  for (let index = 0; index < plays.length; index++) {
    const color = plays[index];

    setTimeout(() => {
      console.log("poner " + speed);
      document.getElementById(`${color}`).classList.add(color);
    }, speed * (index + 1));

    setTimeout(() => {
      console.log("quitar " + speed);
      document.getElementById(`${color}`).classList.remove(color);
    }, speed * (index + 2));
  }
}

function printColors() {
  let board = document.getElementById("board");
  board.innerHTML = colors
    .map((color) => {
      return `<li style='border-color: ${color}; color:${color};' id='${color}' onclick='playGame("${color}")'>${color}</li>`;
    })
    .join("");
}
