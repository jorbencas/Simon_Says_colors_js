let speed = 200;
let level = 1;
let colors = ["red", "yellow", "green", "blue"];
let plays = [];
let plaeysPlays = [];
let maxLevel = 100;
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
    colors.push("olive");
    colors.push("pink");
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
  plaeysPlays = plays;
  Array.from(document.getElementsByTagName("li")).forEach((e) => {
    e.onclick = null;
  });

  await bucle();
  await console.log("bucle");

  Array.from(document.getElementsByTagName("li")).forEach((e) => {
    console.log("fu");
    e.onclick = `play('${e.id}')`;
  });
}
async function bucle() {
  await plays.map(async (color) => {
    await setTimeout(async () => {
      await console.log("opacity(1)");
      document.getElementById(`${color}`).style.filter = "opacity(1)";
    }, speed);
    await setTimeout(async () => {
      await console.log("opacity(0.2)");

      document.getElementById(`${color}`).style.filter = "opacity(0.2)";
    }, speed);
  });
}

const waitFor = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, speed);
  });
};

function play(color) {
  console.log("====================================");
  console.log("Hola mUndo");
  console.log("====================================");
  if (plaeysPlays.shift() !== color || level == maxLevel) {
    plaeysPlays = [];
    level = 0;
  } else {
    plaeysPlays.unshift();
    level++;
    document.getElementById("level").innerText = `Nivel ${level}`;
    nextPlay();
  }
}

function printColors() {
  let board = document.getElementById("board");
  board.innerHTML = colors
    .map((color) => {
      return `<li style='background-color:${color};' id='${color}' onclick='play("${color}")'>${color}</li>`;
    })
    .join("");
}
