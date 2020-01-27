function Node(x, y){
	this.x = x;
	this.y = y;
	this.value = "";
	this.radius = 20;
	this.color = Colors.lightBlue;
	this.textColor = Colors.white;
	this.strokeColor = Colors.blue;
	this.left = null;
	this.right = null;
}

Node.prototype.drawNode = function(){
	drawNode(this.x, this.y, this.radius, this.color ,this.strokeColor, this.value);
}

Node.prototype.setValue = function(value){
	this.value = value;
}