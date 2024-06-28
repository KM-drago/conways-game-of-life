let gridArr = [];

const gridColors = new Map([
  [0, "bg-teal-300"],
  [1, "bg-teal-950"],
]);

let gSizex = 0;

let leftMouseDown = false;

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

function gridDraw(arr) {
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
  gridArr[index[0]][index[1]] = 1;
  changeColor(id);
}

function changeColor(id) {
  let rc = document.getElementById(id);
  rc.classList.remove(gridColors.get(0));
  rc.classList.add(gridColors.get(1));
}

function start() {
  console.log("RUN");
}

function stop() {
  console.log("STOP");
}
