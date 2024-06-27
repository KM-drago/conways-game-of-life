document.addEventListener("load", gridDraw());

function gridDraw() {
  let gSizex = document.getElementById("gSizex").value;

  if (gSizex > 100) {
    gSizex = 100;
  }
  document.getElementById("gSizex").value = gSizex;
  document.getElementById("gSizey").value = gSizex;
  console.log("GG");

  let gridCanvas = document.getElementById("gridCanvas");

  let table = "";
  for (let i = 0; i < gSizex; i++) {
    let tableRow = "<tr>";
    for (let j = 0; j < gSizex; j++) {
      tableRow += `<td id="cell-${i}-${j}" class="border-solid border border-zinc-950 bg-teal-300"></td>`;
    }
    tableRow += "<tr>";
    table += tableRow;
  }
  gridCanvas.innerHTML = "";
  gridCanvas.innerHTML = table;
}

//  let rc = document.getElementById("cell-50-50");
//  rc.classList.remove("bg-teal-300");
//  rc.classList.add("bg-teal-950");
