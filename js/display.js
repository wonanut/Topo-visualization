var canvas = document.getElementById('canvas');
var context = context = canvas.getContext('2d');
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var warningLifeLong = 0;
var warnningText = "";

canvas.width = screenWidth;
canvas.height = screenHeight;
canvas.style.backgroundColor = Colors.gray;
function updateScene(){
	clearCanvas();

	if(mode == 4){
		drawBinTree();
	}
	else{
		drawAllLine();
		drawAllNode();

		drawAllLineWeight();
	}
  	// if(warningLifeLong > 0){
  	// 	drawWarning(warnningText);
  	// 	warningLifeLong--;
  	// }
    drawTip(curTip);
    drawGraphInfo();
}

function drawTip(text){
	context.fillStyle = '#ddd';
	context.fillRect(0, screenHeight - 40, screenWidth, 40);
	context.fillStyle = "#000";
	context.font = "12px Serif";
	context.fillText(text, 20, screenHeight - 15);
}

function addWarning(text){
	warningLifeLong = 180;
	warnningText = text;
}

function drawWarning(text){
	context.fillStyle = '#ddd';
	context.beginPath();
	context.moveTo(screenWidth - 490, 65);
	context.lineTo(screenWidth - 60, 65);
	context.arc(screenWidth - 60, 75, 10, 1.5 * Math.PI, 0);
	context.lineTo(screenWidth - 50, 95);
	context.arc(screenWidth - 60, 95, 10, 0, 0.5 * Math.PI);
	context.lineTo(screenWidth - 490, 105);
	context.arc(screenWidth - 490, 95, 10, 0.5 * Math.PI, Math.PI);
	context.lineTo(screenWidth - 500, 75);
	context.arc(screenWidth - 490, 75, 10, Math.PI, 1.5 * Math.PI);
	context.closePath();
	context.fill();
	context.font = "16px Sarif";
	context.fillStyle = '#000';
	context.fillText(text, screenWidth - 490, 90);
}

function drawNode(x, y, radius, color, strokeColor, value="", type=0){
	if(type == 1){
		console.log(1);
		context.globalAlpha = 0.5;
	}
	context.strokeStyle = strokeColor || Colors.blue;
	context.lineWidth = 2;
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI);
	context.closePath();
	context.fill();
	context.stroke();
	context.font = "14px Arial";
	context.fillStyle = '#000';
	context.fillText(value, x - 8 * value.length / 2, y + 5);
	context.globalAlpha = 1;
}

function drawLine(startX, startY, endX, endY, color){
	context.stokeStyle = color;
	context.lineWidth = 2;
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
}

function drawLineWeight(startX, startY, endX, endY, weight){
	if(weight != null){
		midX = (startX + endX) / 2;
		midY = (startY + endY) / 2;
		weightLen = weight.length;
		context.globalAlpha = 0.7;
		context.fillStyle = '#FFFFFF';
		context.fillRect(midX, midY, (weightLen + 1) * 8, 20);
		context.globalAlpha = 1;
		context.font = "14px Arial";
		context.fillStyle = Colors.red;
		context.fillText(weight, midX + 4, midY + 15);
	}
}

function clearCanvas(){
	context.clearRect(0, 0, screenWidth, screenHeight);
}

function drawAllNode(){
	for(var i = 0; i < nodeList.length; i++){
		nodeList[i].drawNode();
	}
}

function drawAllLine(){
	for(var i = 0; i < lineList.length; i++){
		drawLine(lineList[i].startX, lineList[i].startY, lineList[i].endX, lineList[i].endY);
	}
}

function drawAllLineWeight(){
	for(var i = 0; i < lineList.length; i++){
		drawLineWeight(lineList[i].startX, lineList[i].startY, lineList[i].endX, lineList[i].endY, lineList[i].weight);
	}
}

function drawGraphInfo(){
	context.globalAlpha = 0.3;
	context.fillStyle = "#ddd";
	startX = canvas.width - 420;
	startY = 80;
	context.fillRect(startX, startY, 380, canvas.height - 160);
	context.globalAlpha = 1;

	for(var i = 0; i < nodeList.length; i++){
		curStartX = startX + 10
		context.fillStyle = "#134857";
		context.fillRect(curStartX, startY + 10, 25, 20);
		context.fillStyle = Colors.white;
		context.font = "12px Sarif";
		context.fillText(nodeList[i].value, curStartX + 5, startY + 24);

		curStartX += 30;
		for(var j = 0; j < lineList.length; j++){
			if (lineList[j].startX == nodeList[i].x && lineList[j].startY == nodeList[i].y){
				context.fillStyle = "#5cb3cc";
				context.fillRect(curStartX, startY + 10, 25, 20);
				context.fillStyle = Colors.white;
				context.fillText(getNodeValue(lineList[j].endX, lineList[j].endY), curStartX + 5, startY + 24);
				curStartX += 30;
			}
			if (lineList[j].endX == nodeList[i].x && lineList[j].endY == nodeList[i].y){
				context.fillStyle = "#5cb3cc";
				context.fillRect(curStartX, startY + 10, 25, 20);
				context.fillStyle = Colors.white;
				context.fillText(getNodeValue(lineList[j].startX, lineList[j].startY), curStartX + 5, startY + 24);
				curStartX += 30;
			}
		}
		startY += 24;
	}
}

function getNodeValue(x, y) {
	for(var i = 0; i < nodeList.length; i++) {
		if (nodeList[i].x == x && nodeList[i].y == y) {
			return nodeList[i].value;
		}
	}
	return '?'
}