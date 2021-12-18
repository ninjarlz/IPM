let element;
let elementId;
let elementList;
let elementIndex;
let dropIndex;


  document.addEventListener("dragstart", ({target}) => {
      if (target.className == "dropelement") {
		  element = target;
	  } else if (target.className == "dropinput") {
		  element = target.parentNode;
	  }
      elementId = element.id;
      elementList = element.parentNode.children;
      for(let i = 0; i < elementList.length; i++) {
      	if(elementList[i] === element){
          elementIndex = i;
        }
      }
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
   let draggedElement;
   if(target.className == "dropelement") {
	   draggedElement = target;
   } else if (target.className == "dropinput") {
	  draggedElement = target.parentNode;
   } else {
	   return;
   }
   
   if(draggedElement.id !== elementId) {
	  element.remove(element);
	  for(let i = 0; i < elementList.length; i++) {
		if(elementList[i] === draggedElement){
		  dropIndex = i;
		}
	  }
	  if(elementIndex > dropIndex) {
		draggedElement.before(element);
		return;
	  } 
	  draggedElement.after(element);
	 }
  });