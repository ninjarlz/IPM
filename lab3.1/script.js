let height = 4;
let width = 8;
let array;
let draggedId;
let color;


  function initializeGrid(event) {
	let platform = document.getElementById('platform');
	array = new Array(height);
	for (var i = 0; i < height; i++) {
	 array[i] = new Array(width);
	 let newTr = document.createElement("tr");
	 platform.appendChild(newTr);
	 for (var j = 0; j < width; j++) {
		array[i][j] = false;
		let newTd = document.createElement("td");
		newTd.id = i + "_" + j;
		newTd.className = "cell";
		newTd.draggable = true;
		newTr.appendChild(newTd);
	 }
    }
   }


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function setRandomColor() {
	document.getElementById('box').style.background = getRandomColor();
  }


  document.addEventListener("dragstart", ({target}) => {
    if (target.className == "box") {
		draggedId = null;
		color = target.style.background;
	} else if (target.className == "cell") {
		draggedId = parseId(target.id);
		color = target.style.background;
	}
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
	if(target.className != "cell") {
		return;
	}
	let parsedId = parseId(target.id);
	putCell(parsedId);
   });
  
  
  function putCell(parsedId) {
	for (let yCoordinate = parsedId[0] + 1; yCoordinate < height; yCoordinate++) {
		if (array[yCoordinate][parsedId[1]] == true) {
			fillCell(yCoordinate - 1, parsedId[1]);
			return;
		}
	}
	fillCell(height - 1, parsedId[1]);
  }
  
  function fillCell(yCoordinate, xCoordinate) {
    if (array[yCoordinate][xCoordinate] == true) {
		return;
	}
	let cell = document.getElementById(yCoordinate + "_" + xCoordinate);
	cell.style.background = color;
    array[yCoordinate][xCoordinate] = true; 
	if (draggedId != null) {
	  resetOldPosition();
	}
  }
  
  function resetOldPosition() {
	let cell = document.getElementById(draggedId[0] + "_" + draggedId[1]);
	cell.style.background = "#ffffff";
    array[draggedId[0]][draggedId[1]] = false;
  }

  function parseId(id) {
	let parsedId = id.split("_");
	parsedId[0] = parseInt(parsedId[0]);
	parsedId[1] = parseInt(parsedId[1]);
	return parsedId;
  }