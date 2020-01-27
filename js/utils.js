var toolbarBtnPointer = document.getElementById('btnPointer');
var toolbarBtnClear = document.getElementById('btnClear');
var toolbarBtnNode = document.getElementById('btnDrawNode'); 
var toolbarBtnLine = document.getElementById('btnConnect');
var toolBarBtnBinTree = document.getElementById('btnConnBinTree');

// represent the status of draw line.
// 0: init status
// 1: click the first node 
var drawLineStatus = 0;  
var curSelectedNodeId = -1;
var curSelectedLineId = -1;
var drawLineNodes = {startX: 0, startY: 0, endX: 0, endY: 0};

// status data to move node
var dragStatus = 0;
var dragNodeId = -1;

var Colors = {
	red: '#f25346',
	white: '#ffffff',
	brown: '#59332e',
	green: '#20A162',
	pink: '#F5986E',
	brownDark: '#23190f',
	blue: '#51c4d3',
	lightBlue: '#b0d5df',
	gray: '#f2f2f2',
};

canvas.onmousedown = function(e){
	mousePos.x = e.pageX;
	mousePos.y = e.pageY;

	if(mousePos.y < screenHeight - 40 && e.button == 0){
		switch(mode)
		{
			case 0 :
				dragNodeId = getNodeIDHere(mousePos.x, mousePos.y);
				if(dragNodeId != -1) addWarning("Drag the mouse to move this node.");
				break;
			case 1:
				clearNode(mousePos.x, mousePos.y);
				break;
			case 2:
				if(canDrawNodeHere(mousePos.x, mousePos.y)){
					var tempNode = new Node(mousePos.x, mousePos.y);
					tempNode.drawNode();
					nodeList.push(tempNode);
					// showSetValueBox(nodeList[nodeList.length - 1].x, nodeList[nodeList.length - 1].y);
				}
				break;
			case 3:
				var tempNode = getNodeHere(mousePos.x, mousePos.y);
				if(drawLineStatus == 0){
					if(tempNode != null){
						drawLineNodes.startX = tempNode.x;
						drawLineNodes.startY = tempNode.y;
						drawLineStatus = 1;
					}
				} 
				else{
					if(tempNode != null && tempNode.x != drawLineNodes.startX && tempNode.y != drawLineNodes.startY &&
						!IsLineExist(drawLineNodes.startX, drawLineNodes.startY, tempNode.x, tempNode.y)){
						drawLineNodes.endX = tempNode.x;
						drawLineNodes.endY = tempNode.y;
						drawLineStatus = 0;
						var tempLine = new Line(drawLineNodes.startX, drawLineNodes.startY, drawLineNodes.endX, drawLineNodes.endY);
						lineList.push(tempLine);
						drawLine(drawLineNodes.startX, drawLineNodes.startY, drawLineNodes.endX, drawLineNodes.endY);
					}
					else{
						drawLineStatus = 0;
					}
				}
				break;
			case 4:
				break;
			default:;
		}
	}
}

canvas.onmouseup = function(){
	dragNodeId = -1;
}

canvas.onmousemove = function(e){
	mousePos.x = e.pageX;
	mousePos.y = e.pageY;

	if(dragNodeId > -1){
		// update line linked to that point.
		for(var i = 0; i < lineList.length; i++){
			if(lineList[i].startX == nodeList[dragNodeId].x && lineList[i].startY == nodeList[dragNodeId].y)
			{
				lineList[i].startX = mousePos.x;
				lineList[i].startY = mousePos.y;
			}
			if(lineList[i].endX == nodeList[dragNodeId].x && lineList[i].endY == nodeList[dragNodeId].y)
			{
				lineList[i].endX = mousePos.x;
				lineList[i].endY = mousePos.y;
			}
		}

		nodeList[dragNodeId].x = mousePos.x;
		nodeList[dragNodeId].y = mousePos.y;
	}
}

// right click function
canvas.oncontextmenu = function(e){
	e.preventDefault();
	var tempX = e.pageX;
	var tempY = e.pageY;

	// set value of node
	var tempNode = getNodeHere(tempX, tempY);
	if(tempNode != null){
		curSelectedNodeId = getNodeIDHere(tempX, tempY);
		showSetValueBox(tempNode.x, tempNode.y);
	}
	else{
		// set weight of line
		var tempLine = getLineHere(tempX, tempY);
		if(tempLine != -1){
			curSelectedLineId = tempLine;
			midX = (lineList[tempLine].startX + lineList[tempLine].endX) / 2;
			midY = (lineList[tempLine].startY + lineList[tempLine].endY) / 2;
			showSetWeightBox(midX, midY);
		}
	}

	mode = 0;
	clearToolBarActive();
	toolbarBtnPointer.classList.add('btnActive');
}

function clearNode(x, y){
	var tempNodeId = getNodeIDHere(x, y);
	if(tempNodeId > -1)
	{
		for(var i = 0; i < lineList.length; i++){
			if(lineList[i].startX == nodeList[tempNodeId].x && lineList[i].startY == nodeList[tempNodeId].y || 
				lineList[i].endX == nodeList[tempNodeId].x && lineList[i].endY == nodeList[tempNodeId].y){
				lineList.splice(i, 1);
				i--;
			}
		}
		nodeList.splice(tempNodeId, 1);
	}
}

function showSetValueBox(x, y){
	var setValueBox = document.getElementById('setValue');
	setValueBox.style.visibility = "visible";
	setValueBox.style.left = x - 15 + 'px';
	setValueBox.style.top = y - 10 + 'px';
	document.getElementById('value').focus();
}

function showSetWeightBox(x, y){
	var setWeightBox = document.getElementById('setWeight');
	setWeightBox.style.visibility = "visible";
	setWeightBox.style.left = x - 15 + 'px';
	setWeightBox.style.top = y - 10 + 'px';
	document.getElementById('weight').focus();
}

function clearToolBarActive(){
	toolbarBtnPointer.classList.remove('btnActive');
	toolbarBtnClear.classList.remove('btnActive');
	toolbarBtnNode.classList.remove('btnActive');
	toolbarBtnLine.classList.remove('btnActive');
	toolBarBtnBinTree.classList.remove('btnActive');
}

toolbarBtnPointer.onclick = function(e){
	mode = 0;
	clearToolBarActive();
	toolbarBtnPointer.classList.add('btnActive');
}

toolbarBtnClear.onclick = function(e){
	mode = 1;
	clearToolBarActive();
	toolbarBtnClear.classList.add('btnActive');
}

toolbarBtnNode.onclick = function(e){
	mode = 2;
	clearToolBarActive();
	toolbarBtnNode.classList.add('btnActive');
}

toolbarBtnLine.onclick = function(e){
	mode = 3;
	clearToolBarActive();
	toolbarBtnLine.classList.add('btnActive');
}

toolBarBtnBinTree.onclick = function(e){
	mode = 4;
	addWarning("BinTree mode is not related to other mode.");
	clearToolBarActive();
	toolBarBtnBinTree.classList.add('btnActive');
}

function isInCircle(clkX, clkY, cirX, cirY, radius){
	return radius * radius - (clkX - cirX) * (clkX - cirX) - (clkY - cirY) * (clkY - cirY) >= 0 ? true : false;
}

function dist(x1, x2, y1, y2){
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function isInLine(clkX, clkY, startX, startY, endX, endY){
	cosTheta = ((endX - clkX) * (startX - clkX) + (endY - clkY) * (startY - clkY)) / (dist(endX, clkX, endY, clkY) * dist(startX, clkX, startY, clkY));
	return -1 <= cosTheta && cosTheta <= -0.985;
}

function IsLineExist(startX, startY, endX, endY){
	for(var i = 0; i < lineList.length; i++){
		if(lineList[i].startX == startX && lineList[i].startY == startY && lineList[i].endX == endX && lineList[i].endY == endY ||
			lineList[i].startX == endX && lineList[i].startY == endY && lineList[i].endX == startX && lineList[i].endY == startY ){
			return true;
		}
	}
	return false;
}

function getLineHere(x, y){
	for(var i = 0; i < lineList.length; i++){
		if(isInLine(x, y, lineList[i].startX, lineList[i].startY, lineList[i].endX, lineList[i].endY)){
			return i;
		}
	}
	return -1;
}

function getNodeHere(x, y){
	for(var i = 0; i < nodeList.length; i++){
		if(isInCircle(x, y, nodeList[i].x, nodeList[i].y, nodeList[i].radius)){
			return nodeList[i];
		}
	}
	return null;
}

function getNodeIDHere(x, y){
	for(var i = 0; i < nodeList.length; i++){
		if(isInCircle(x, y, nodeList[i].x, nodeList[i].y, nodeList[i].radius)){
			return i;
		}
	}
	return -1;
}

function canDrawNodeHere(x, y){
	for(var i = 0; i < nodeList.length; i++){
		if(isInCircle(x, y, nodeList[i].x, nodeList[i].y, nodeList[i].radius * 2)){
			return false;
		}
	}
	return true;
}

function setNodeValue(){
	if(event.keyCode == 13 && curSelectedNodeId != -1){
		document.getElementById('setValue').style.visibility = "hidden";
    	nodeList[curSelectedNodeId].setValue(document.getElementById('value').value);
    	curSelectedNodeId = -1;
		document.getElementById('value').value = "";
    }   
}

function setLineWeight(){
	if(event.keyCode == 13 && curSelectedLineId != -1){
		document.getElementById('setWeight').style.visibility = "hidden";
    	lineList[curSelectedLineId].setWeight(document.getElementById('weight').value);
    	curSelectedLineId = -1;
		document.getElementById('weight').value = "";
    }   
}

document.getElementById('value').onblur = function(){
	if(curSelectedNodeId != -1){
		nodeList[curSelectedNodeId].setValue(document.getElementById('value').value);
		curSelectedNodeId = -1;
		document.getElementById('value').value = "";
	}
	document.getElementById('setValue').style.visibility = "hidden";
}

document.getElementById('weight').onblur = function(){
	if(curSelectedLineId != -1){
		lineList[curSelectedLineId].setWeight(document.getElementById('weight').value);
		curSelectedLineId = -1;
		document.getElementById('weight').value = "";
	}
	document.getElementById('setWeight').style.visibility = "hidden";
}

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.msRequestAnimationFrame     ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);//低版本保险刷新频率
      };
})();