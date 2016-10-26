function setup(){
	var scl = 500;
	canvas("canvas2","2d",scl,scl);
	var cx = CANVAS.context;
	cx.strokeRect(0,0,scl,scl);
	scl /= 72;
	var car = function(color,direction=0){
		cx.fillStyle="#333333";
		cx.strokeStyle="#333333";
		circle(cx,scl*4,scl*1,scl*1.2);
		cx.fill();
		circle(cx,scl*-4,scl*1,scl*1.2);
		cx.fill();
		cx.strokeStyle=color
		cx.fillStyle = color;
		rectangle(cx,0,0,scl*3,scl*12,4);
		cx.fill();
		circle(cx,scl*6,0,scl*1.5);
		cx.fill();
		circle(cx,scl*-6,0,scl*1.5);
		cx.fill();
		if(direction==true){
			rectangle(cx,0,scl*-1.5,scl*2,scl*2,3);
			cx.fill();
			rectangle(cx,0,scl*-1.5,scl*2,scl*3.5,2);
			cx.fill();
			triangle(cx,[{x:scl*-2,y:scl*-1.5},{x:scl*-2,y:scl*-3.5},{x:scl*-5,y:scl*-1.5}]);
			cx.fill();
			triangle(cx,[{x:scl*3.5,y:scl*-1.5},{x:scl*3.5,y:scl*-3.5},{x:scl*5.5,y:scl*-1.5}]);
			cx.fill();
		} else {
			rectangle(cx,0,scl*-1.5,scl*2,scl*2,2);
			cx.fill();
			rectangle(cx,0,scl*-1.5,scl*2,scl*3.5,3);
			cx.fill();
			triangle(cx,[{x:scl*2,y:scl*-1.5},{x:scl*2,y:scl*-3.5},{x:scl*5,y:scl*-1.5}]);
			cx.fill();
			triangle(cx,[{x:scl*-3.5,y:scl*-1.5},{x:scl*-3.5,y:scl*-3.5},{x:scl*-5.5,y:scl*-1.5}]);
			cx.fill();
		}
	}
	cx.fillStyle = "#99f4f4";
	//sky
	rectangle(cx,0,CANVAS.height/3,CANVAS.height/3,CANVAS.width,2);
	cx.fill()
	{	//cloud
		cx.fillStyle 	= "#f1ffff";
		cx.strokeStyle 	= "#f1ffff";
		pos = {x:scl*30,y:scl*13};
		cscl = scl*1.75;
		rectangle(cx,pos.x,pos.y,cscl*2,cscl*5,4);
		cx.fill();
		circle(cx,pos.x+cscl*2.5,pos.y,cscl*1);
		cx.fill();
		circle(cx,pos.x-cscl*2.5,pos.y,cscl*1);
		cx.fill();
		circle(cx,pos.x+cscl*1.75,pos.y-cscl*0.75,cscl*1);
		cx.fill();
		circle(cx,pos.x-cscl*1.5,pos.y-cscl*1,cscl*1);
		cx.fill();
		circle(cx,pos.x-cscl*0.5,pos.y-cscl*1.25,cscl*1.25);
		cx.fill();
		circle(cx,pos.x+cscl*0.75,pos.y-cscl*1.6,cscl*1);
		cx.fill();
	}
	{	//cloud
		cx.fillStyle 	= "#f1ffff";
		cx.strokeStyle 	= "#f1ffff";
		pos = {x:scl*55,y:scl*10};
		cscl = scl*2;
		rectangle(cx,pos.x,pos.y,cscl*2,cscl*5,4);
		cx.fill();
		circle(cx,pos.x+cscl*2.5,pos.y,cscl*1);
		cx.fill();
		circle(cx,pos.x-cscl*2.5,pos.y,cscl*1);
		cx.fill();
		circle(cx,pos.x+cscl*2,pos.y-cscl*1,cscl*1);
		cx.fill();
		circle(cx,pos.x-cscl*1.5,pos.y-cscl*1,cscl*1);
		cx.fill();
		circle(cx,pos.x+cscl*0.75,pos.y-cscl*1.25,cscl*1);
		cx.fill();
		circle(cx,pos.x-cscl*0.5,pos.y-cscl*1.5,cscl*1);
		cx.fill();
	}
	//sun
	cx.fillStyle 	= "#fff229";
	cx.strokeStyle 	= "#fff229";
	circle(cx,scl*6,scl*4,scl*3);
	cx.fill();
	//ground
	cx.fillStyle = "#178800";
	cx.strokeStyle = "#178800";
	rectangle(cx,0,CANVAS.height/3,CANVAS.height*2/3,CANVAS.width);
	cx.fill();
	//road
	cx.fillStyle = "#555555";
	rectangle(cx,0,CANVAS.height/2.25,CANVAS.height/3,CANVAS.width);
	cx.fill();
	cx.fillStyle = "#dddddd";
	cx.strokeStyle = "#555555";
	rectangle(cx,0,CANVAS.height/2.5+CANVAS.height/2.5/2,scl*1,CANVAS.width);
	cx.fill();
	//cars
	cx.translate(0,CANVAS.height/2);
	cx.translate(scl*10,scl*-2.25);
	car("#888888");
	cx.translate(scl*16,0);
	car("#327121");
	cx.translate(scl*18,0);
	car("#888444");
	cx.translate(scl*20,0);
	car("#834384");
	cx.translate(scl*-50,scl*2.6);
	car("#662233");
	cx.translate(scl*18,0);
	car("#331155");
	cx.translate(scl*16,0);
	car("#999999");
	cx.translate(scl*17,0);
	car("#333333");
	cx.translate(scl*-60,scl*2.6)
	car("#883366");
	cx.translate(scl*20,0);
	car("#775893");
	cx.translate(scl*17,0);
	car("#483750");
	cx.translate(scl*18,0);
	car("#958793");
	cx.translate(scl*16,0);
	car("#488593");
	cx.translate(scl*-70,scl*8);
	car("#883002",1);
	cx.translate(scl*26,0);
	car("#428889",1);
	cx.translate(scl*23,0);
	car("#377843",1);
	cx.translate(scl*-40,scl*2.8);
	car("#995839",1);
	cx.translate(scl*30,0);
	car("#995887",1);
	cx.translate(scl*30,0);
	car("#224433",1);
	cx.translate(scl*-63,scl*2.8);
	car("#834384",1);
	cx.translate(scl*23,0);
	car("#999999",1);
	cx.translate(scl*30,0);
	car("#999999",1);
	return true;
}
