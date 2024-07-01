let gridArr = [];

const gridColors = new Map([
  [0, "bg-teal-300"],
  [1, "bg-teal-950"],
]);

let gSizex = 0;

let leftMouseDown = false;

let interval;
let intervalStarted = false;

let timeInterval = 500;
let speedBumpVal = 50;

let slowDownBtn = document.getElementById("slowDownBtn");
let speedUpBtn = document.getElementById("speedUpBtn");

document.addEventListener("load", init());

document.addEventListener("mousedown", function (event) {
  if (event.button === 0) {
    leftMouseDown = true;
  }
});

document.addEventListener("mouseup", function (event) {
  if (event.button === 0) {
    leftMouseDown = false;
  }
});

function init() {
  gridArr = [];

  gSizex = document.getElementById("gSizex").value;

  if (gSizex > 100) {
    gSizex = 100;
  }
  document.getElementById("gSizex").value = gSizex;
  document.getElementById("gSizey").value = gSizex;

  for (let i = 0; i < gSizex; i++) {
    let gridRow = [];
    for (let j = 0; j < gSizex; j++) {
      gridRow.push(0);
    }
    gridArr.push(gridRow);
  }
  gridDraw(gridArr);
}

async function gridDraw(arr) {
  let gridCanvas = document.getElementById("gridCanvas");

  let table = "";
  for (let i = 0; i < gSizex; i++) {
    let tableRow = "<tr>";
    for (let j = 0; j < gSizex; j++) {
      tableRow += `<td id="${i}-${j}" class="border-solid border border-zinc-950 ${gridColors.get(arr[i][j])}" onclick="clickCellColor(this.id)" onmouseover="dragCellColor(this.id)"></td>`;
    }
    tableRow += "<tr>";
    table += tableRow;
  }
  gridCanvas.innerHTML = "";
  gridCanvas.innerHTML = table;
}

function dragCellColor(id) {
  if (leftMouseDown) {
    let index = String(id).split("-");
    gridArr[index[0]][index[1]] = 1;
    changeColor(id);
  }
}

function clickCellColor(id) {
  let index = String(id).split("-");

  if (gridArr[index[0]][index[1]] == 1) {
    gridArr[index[0]][index[1]] = 0;
    changeColorReverse(id);
  } else {
    gridArr[index[0]][index[1]] = 1;
    changeColor(id);
  }
}

function changeColor(id) {
  let rc = document.getElementById(id);
  rc.classList.remove(gridColors.get(0));
  rc.classList.add(gridColors.get(1));
}

function changeColorReverse(id) {
  let rc = document.getElementById(id);
  rc.classList.remove(gridColors.get(1));
  rc.classList.add(gridColors.get(0));
}

function speedUp() {
  console.log("GG");
  if (timeInterval > 0) {
    timeInterval -= speedBumpVal;
  }
}

function slowDown() {
  if (timeInterval < 1500) {
    timeInterval += speedBumpVal;
  }
}

function start() {
  btnDisable(slowDownBtn);
  btnDisable(speedUpBtn);
  if (!intervalStarted) {
    interval = setInterval(gridValUpdate, timeInterval);
  }
  intervalStarted = true;
}

function btnDisable(btn) {
  btn.disabled = true;
  btn.classList.add("opacity-50");
  btn.classList.add("cursor-not-allowed");
  btn.classList.remove("hover:bg-blue-700");
}

function btnEnable(btn) {
  btn.disabled = false;
  btn.classList.remove("opacity-50");
  btn.classList.remove("cursor-not-allowed");
  btn.classList.add("hover:bg-blue-700");
}

async function gridValUpdate() {
  let newGrid = [];
  for (let i = 0; i < gSizex; i++) {
    let newGridRow = [];
    for (let j = 0; j < gSizex; j++) {
      let neighbourActive = await getNeighbourActive(i, j);

      if (gridArr[i][j] == 1 && (neighbourActive == 2 || neighbourActive == 3)) {
        newGridRow.push(1);
      } else if (gridArr[i][j] == 0 && neighbourActive == 3) {
        newGridRow.push(1);
      } else {
        newGridRow.push(0);
      }
    }
    newGrid.push(newGridRow);
  }
  gridArr = newGrid;
  await gridDraw(gridArr);
}

async function getNeighbourActive(i, j) {
  // i-1
  let valI_1 = Math.abs((i - 1) % gSizex);
  //i+1
  let valI1 = Math.abs((i + 1) % gSizex);

  //j-1
  let valJ_1 = Math.abs((j - 1) % gSizex);
  //j+1
  let valJ1 = Math.abs((j + 1) % gSizex);

  let neighbourActive = 0;

  gridArr[valI_1][valJ_1] ? (neighbourActive += 1) : neighbourActive;
  gridArr[valI_1][j] ? (neighbourActive += 1) : neighbourActive;
  gridArr[valI_1][valJ1] ? (neighbourActive += 1) : neighbourActive;
  gridArr[i][valJ_1] ? (neighbourActive += 1) : neighbourActive;

  gridArr[i][valJ1] ? (neighbourActive += 1) : neighbourActive;
  gridArr[valI1][valJ_1] ? (neighbourActive += 1) : neighbourActive;
  gridArr[valI1][j] ? (neighbourActive += 1) : neighbourActive;
  gridArr[valI1][valJ1] ? (neighbourActive += 1) : neighbourActive;

  return neighbourActive;
}

function stop() {
  btnEnable(slowDownBtn);
  btnEnable(speedUpBtn);
  clearInterval(interval);
  intervalStarted = false;
}
