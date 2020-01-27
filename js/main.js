var mode = 0;
var nodeList = [];
var lineList = [];
var mousePos = {x: 0, y: 0};
var curTip = "Howard Wonanut.";

!function drawFrame(){
	updateScene();

	switch(mode){
		case 0:
			curTip = "You can drag the node to other place if currently you have at least one node.";
			break;
		case 1:
			curTip = "Click the node you want to delete, but be careful since it will also delete lines connected to that node.";
			break;
		case 2:
			drawNode(mousePos.x, mousePos.y, 20, "#9abeaf", "#40a070", "", 1);
			curTip = "Click to draw a new node, it is also OK to click the mouse right on a existed node to set a name for it,";
			break;
		case 3:
			if(drawLineStatus == 1){
				curTip = "Click on other node to draw a new line.";
				drawLine(drawLineNodes.startX, drawLineNodes.startY, mousePos.x, mousePos.y);
			}
			else{
				curTip = "Select a node to begin draw a line.";
			}
			break;
		case 4:
			curTip = "Pay attention please, in this mode your operation is not related to other mode.";
		default:;
	}
  window.requestAnimationFrame(drawFrame);
}();