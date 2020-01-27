function Line(x1, y1, x2, y2){
	this.startX = x1;
	this.startY = y1;
	this.endX = x2;
	this.endY = y2;
	this.weight = null;
}

Line.prototype.setWeight = function(w) {
	this.weight = w;
}