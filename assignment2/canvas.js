function setup(){
	var scl = 800;
	//canvas("canvas","2d",11*scl/6,11*scl/6);
	canvas("canvas","2d",scl,scl);
	CANVAS.context.strokeRect(0,0,scl,scl);
	scl *= 12/22;
	CANVAS.context.translate(CANVAS.width/2,(CANVAS.height/2)+scl*0.11);
	CANVAS.context.strokeStyle="#00DD00"
	triangle(CANVAS.context,undefined,scl*1.015);
	CANVAS.context.strokeStyle="#000000"
	triangle(CANVAS.context,undefined,scl*0.7);
	//lines
	CANVAS.context.beginPath();
	CANVAS.context.moveTo(0,scl*0.35);
	CANVAS.context.lineTo(0,scl*-1.013);
	CANVAS.context.stroke();
	CANVAS.context.rotate(Math.PI/3);
	CANVAS.context.beginPath();
	CANVAS.context.moveTo(0,scl*-0.35);
	CANVAS.context.lineTo(0,scl*1.013);
	CANVAS.context.stroke();
	CANVAS.context.rotate(Math.PI/3);
	CANVAS.context.beginPath();
	CANVAS.context.moveTo(0,scl*0.35);
	CANVAS.context.lineTo(0,scl*-1.013);
	CANVAS.context.stroke();
	//end lines
	CANVAS.context.rotate(Math.PI);
	triangle(CANVAS.context,undefined,scl*0.35);
	circle(CANVAS.context,undefined,undefined,scl*0.508);
	CANVAS.context.strokeStyle="#0000FF"
	circle(CANVAS.context,undefined,0,scl*0.8);
	CANVAS.context.strokeStyle="#FF0000"
	circle(CANVAS.context,(scl*0.35)*Math.sqrt(3)/2,(scl*0.35)/2,scl*.45);
	circle(CANVAS.context,(scl*-0.35)*Math.sqrt(3)/2,(scl*0.35)/2,scl*.45);
	circle(CANVAS.context,undefined,(scl*-0.35),scl*.45);
	return true;
}

