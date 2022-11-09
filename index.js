let plays = [];
let plaeysPlays = [];
let maxLevel = 100;
let speed = 1000;
let level = 1;
let colorList = {
  red: "eb4646",
  yellow: "fbfb46",
  green: "008046",
  blue: "000046",
  teal: "0fc2c5",
  Salmon: "FA8072",
};
let colors = Object.keys(colorList).reverse().slice(2).reverse();
async function playGame(color) {
  const colorFind = plaeysPlays.shift();
  if (level == maxLevel) {
    resetGame();
  } else if (colorFind.trim() === color.trim()) {
    plaeysPlays.unshift();
    if(plaeysPlays.length == 0){
      level++;
      document.getElementById("level").innerText = `Nivel ${level}`;
      nextPlay();
    }
  } else if(plaeysPlays.length > 0) {
    document.getElementById("level").innerText = `Error `;
    resetGame();
    await waitFor(1000);
    document.getElementById("level").innerText = `Nivel ${level}`;
    nextPlay();
  } else {
    level++;
    document.getElementById("level").innerText = `Nivel ${level}`;
    nextPlay();
  } 
}

function resetGame(){
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

async function nextPlay() {
  if (level === 15 || level === 20) {
    colors.push("teal");
    colors.push("Salmon");
    printColors();
  } else if (level === 10) {
    speed = speed - 200;
  } else if (level > 1) {
    speed = speed - 100;
  }
  let color = colors[Math.floor(Math.random() * colors.length)];
  plays.push(color);
  plaeysPlays = [...plays];
  document.getElementById("board").style.cursor = "disabled";
  await bucle();
  document.getElementById("board").style.cursor = "default";
}

async function bucle() {
  plays.forEach(async (color, i) => {
    await waitFor(speed * ( i + 1));
    console.log("poner " + color);
    document.getElementById(`${color}`).style.color = "white";
    document.getElementById(`${color}`).style.backgroundColor =
      "#" + colorList[color];
    await waitFor(speed * ( i + 2));
    console.log("quitar " + color);
    document.getElementById(`${color}`).style.color = color;
    document.getElementById(`${color}`).style.backgroundColor = "transparent";
  });
}

const waitFor = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

function printColors() {
  let board = document.getElementById("board");
  board.innerHTML = colors
    .map((color) => {
      return `<li style='border:2px solid ${color}; color:${color};' id='${color}' onclick='playGame("${color}")'>${color}</li>`;
    })
    .join("");
}
