const MAX_LEVEL = 100;
let speed = 600;
let colors = ["red", "yellow", "green", "blue"];
let plays = [];
let playersPlays = [];
let level = 1;

async function playGame(color) {
  const COLOR_FIND = playersPlays.shift();
  if (!COLOR_FIND || COLOR_FIND !== color) {
    document.getElementById("board").classList.add("unclickable");
    document.getElementById("level").innerText = `Error`;
    let list = document.getElementsByTagName("li");
    Array.from(list).forEach((e) => {
      e.classList.add("error");
    });
    resetGame();
    await waitFor(1000);
    Array.from(list).forEach((e) => {
      e.classList.remove("error");
    });
    document.getElementById(
      "level"
    ).innerText = `Nivel ${level} de ${MAX_LEVEL}`;
    nextPlay();
    document.getElementById("board").classList.remove("unclickable");
  } else if (COLOR_FIND === color) {
    playersPlays.unshift();
    if (playersPlays.length == 0) {
      handleLevels("add");
      nextPlay();
    }
  } else {
    handleLevels("add");
    nextPlay();
  }
}

function resetGame() {
  playersPlays = [];
  level = 1;
  plays = [];
  speed = 600;
  colors = ["red", "yellow", "green", "blue"];
}

async function start(event) {
  event.target.style.display = "none";
  document.getElementById("board").style.display = "flex";
  document.getElementById("level").style.display = "block";
  printColors();
  nextPlay();
}

async function nextPlay() {
  if (level == MAX_LEVEL) {
    resetGame();
    printColors();
  }
  await waitFor(1000);
  await handleLevels();
  let color = colors[Math.floor(Math.random() * colors.length)];
  plays.push(color);
  playersPlays = [...plays];
  document.getElementById("board").classList.add("unclickable");
  document.getElementById("level").innerText = `Reproduciendo secuencia ...`;
  await playMoves();
  document.getElementById("board").classList.remove("unclickable");
  document.getElementById("level").innerText = `Nivel ${level} de ${MAX_LEVEL}`;
}

async function handleLevels(action = "") {
  if (action == "add") {
    level++;
    document.getElementById(
      "level"
    ).innerText = `Nivel ${level} de ${MAX_LEVEL}`;
  } else {
    if (level === 15 || level === 20) {
      colors.push("teal");
      colors.push("Salmon");
      printColors();
    } else if (level === 10) {
      speed = speed - 200;
    } else if (level > 1) {
      speed--;
    }
  }
}

async function playMoves() {
  for (let index = 0; index < plays.length; index++) {
    let color = plays[index];
    await waitFor(speed * (index + 1));
    document.getElementById(`${color}`).classList.add(color);
    await waitFor(speed * (index + 2));
    document.getElementById(`${color}`).classList.remove(color);
  }
}

const waitFor = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

function printColors() {
  let board = document.getElementById("board");
  board.innerHTML = colors
    .map((color) => {
      return `<li style='border-color: ${color}; color:${color};' id='${color}' onclick='playGame("${color}")'>${color}</li>`;
    })
    .join("");
}
