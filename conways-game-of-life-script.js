document.addEventListener("load", gridDraw());

let leftMouseDown = false;

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

function gridDraw() {
  let gSizex = document.getElementById("gSizex").value;

  if (gSizex > 100) {
    gSizex = 100;
  }
  document.getElementById("gSizex").value = gSizex;
  document.getElementById("gSizey").value = gSizex;

  let gridCanvas = document.getElementById("gridCanvas");

  let table = "";
  for (let i = 0; i < gSizex; i++) {
    let tableRow = "<tr>";
    for (let j = 0; j < gSizex; j++) {
      tableRow += `<td id="${i}-${j}" class="border-solid border border-zinc-950 bg-teal-300" onclick="clickCellColor(this.id)" onmouseover="dragCellColor(this.id)"></td>`;
    }
    tableRow += "<tr>";
    table += tableRow;
  }
  gridCanvas.innerHTML = "";
  gridCanvas.innerHTML = table;
}

function dragCellColor(id) {
  if (leftMouseDown) {
    let rc = document.getElementById(id);
    rc.classList.remove("bg-teal-300");
    rc.classList.add("bg-teal-950");
  }
}

function clickCellColor(id) {
  let rc = document.getElementById(id);
  rc.classList.remove("bg-teal-300");
  rc.classList.add("bg-teal-950");
}

function start() {
  console.log("RUN");
}

function stop() {
  console.log("STOP");
}
