let speed = 200;
let level = 1;
let colors = ['red', 'yellow','green','blue'];
let plays = [];
let plaeysPlays = [];
function start(){
    let board = document.getElementById('board');    
    board.innerHTML = colors.map( (color) => {
        return `<li onclick='play("${color}")'>${color}</li>`;
    }).join('\n');
    nextPlay();
}

function nextPlay(){
    plays.forEach( (color) => {
        setTimeout(() => {
            document.getElementById(`${color}`).onclick = null;
            document.getElementById(`${color}`).style.color = color;
        }, speed);
    }); 

    plays.forEach( (color) => {
        document.getElementById(`${color}`).onclick = `play('${color}')`;
        document.getElementById(`${color}`).style.color = 'black';
    }); 
    if{level === 10}{
        speed = speed - 2;
    } else if{level === 15}{
        // 2 colors mas
    } else if{level === 20}{
        // 2 colors mas
    }
    let color = colors[Math.floor(Math.random() * colors.length)];
    plays.push(color);
}

function play(color){
    if(plaeysPlays.length == plays.length){
        if(plays.filter((e,i) => plaeysPlays[i] === e).length <  plays.length){
            plaeysPlays = [];
            level++;
            setTimeout(() => {
                nextPlay()
            }, 4000);
        }
    } else{
        plaeysPlays.push(color);
    }
}