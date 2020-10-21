window.onload = function () {
    createArray();
}

function createArray() {
    var grid = document.getElementById("grid");

    //Create grid
    grid.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () { clickCell(this); };
            //add attribute 
            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    addMines();
}

//randomize 20 mines across the grid
function addMines() {
    for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[col];
        //set attribute if cell is a mine
        cell.setAttribute("data-mine", "true");
    }
}

function revealMines() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
        }
    }
}

function checkCompletion() {
    var levelComplete = true;
      for (var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
          if ((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
        }
    }
    if (levelComplete) {
      alert("Wygrales!");
      revealMines();
    }
  }

function clickCell(cell) {
    if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        alert("Game Over");
    } else {
        cell.className = "clicked";
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount == 0) {
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);
                }
            }
        }
        checkCompletion();
    }
}