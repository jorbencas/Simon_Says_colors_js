let speed = 2000;
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

let plays = [];
let plaeysPlays = [];
let maxLevel = 100;
function playGame(color) {
  console.log("====================================");
  console.log("Hola mUndo " + color);
  console.log("====================================");

  if (plaeysPlays.length == 0 || level == maxLevel) {
    plaeysPlays = [];
    level = 1;
  } else if (plaeysPlays.shift() === color) {
    if (plays.length > 1) plaeysPlays.unshift();
    level++;
    document.getElementById("level").innerText = `Nivel ${level}`;
    nextPlay();
  } else {
    document.getElementById("level").innerText = `Error `;
    plaeysPlays = [];
    level = 1;
  }
}

function start(event) {
  //   sequence = new Array(maxLevel)
  //     .fill(0)
  //     .map((n) => Math.floor(Math.random() * 4));
  //   console.log("====================================");
  //   console.log(sequence);
  //   console.log("====================================");
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
  } else if (level == 1) {
    //let color = colors[Math.floor(Math.random() * colors.length)];
  } else if (level > 1) {
    speed = speed - 100;
  }
  let color = colors[Math.floor(Math.random() * colors.length)];
  plays.push(color);
  plaeysPlays = [...plays];
  console.log("====================================");
  console.log(plays);
  console.log("====================================");
  document.getElementById("board").style.cursor = "disabled";
  await bucle();
  document.getElementById("board").style.cursor = "default";
}

async function bucle() {
  plays.forEach(async (color, i) => {
    await waitFor(speed * (i + 1));
    document.getElementById(`${color}`).style.color = "white";
    document.getElementById(`${color}`).style.backgroundColor =
      "#" + colorList[color];
    await waitFor(speed * (i + 2));
    document.getElementById(`${color}`).style.color = color;
    document.getElementById(`${color}`).style.backgroundColor = "transparent";
  });
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
      return `<li style='border:2px solid ${color}; color:${color};' id='${color}' onclick='playGame("${color}")'>${color}</li>`;
    })
    .join("");
}
