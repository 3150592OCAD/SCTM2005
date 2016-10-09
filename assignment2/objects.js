function rectangle(cx,px,py,h,w,r){
	//x position
	var px = (typeof(px)!=='undefined') ? px : 0;
	//y position
	var py = (typeof(py)!=='undefined') ? py : 0;
	//height
	var h = (typeof(h)!=='undefined') ? h : 1;
	//width
	var w = (typeof(w)!=='undefined') ? w : 1;
	// relative to (corner or center)
	var r = (typeof(r)!=='undefined') ? r : 0;
	switch(r){
		case 0: 		//position: top left
			break; 		
		case 1:			//position: top right
			px -= w;
			break;
		case 2:			//position: bottom left
			py -= h; 
			break;
		case 3: 		//position: bottom right
			px -= w;
			py -= h;
			break;
		case 4: 		//position: center
			px -= w/2;
			py -= h/2;
			break;
		default: 		//position: top left
			break;
	}
	cx.beginPath();
	cx.moveTo(px,py);
	cx.lineTo(px+w,py);
	cx.lineTo(px+w,py+h);
	cx.lineTo(px,py+h);
	cx.lineTo(px,py);
	cx.closePath();
	cx.stroke();
}
function circle(cx,px,py,R,r){
	//x position
	var px = (typeof(px)!=='undefined') ? px : 0;
	//y position
	var py = (typeof(py)!=='undefined') ? py : 0;
	//radius
	var R = (typeof(R)!=='undefined') ? R : 1;
	//relative to (left, bottom, right, top, center)
	var r = (typeof(r)!=='undefined') ? r : 0;
	switch(r){
		case 0: 		//position: center
			break; 		
		case 1:			//position: left
			px -= R;
			break;
		case 2: 		//position: bottom
			py += R;
			break;
		case 3: 		//position: right
			px += R;
			break;
		case 4:			//position: top
			py -= R;
			break;
		default: 		//position: center
			break;
	}
	cx.beginPath();
	cx.arc(px,py,R,0,2*Math.PI);
	cx.closePath();
	cx.stroke();
}
function circ(cx,px,py,R,r,sa,ea,c){
	//x position
	var px = (typeof(px)!=='undefined') ? px : 0;
	//y position
	var py = (typeof(py)!=='undefined') ? py : 0;
	//radius
	var R = (typeof(R)!=='undefined') ? R : 1;
	//relative to (left, bottom, right, top, center)
	var r = (typeof(r)!=='undefined') ? r : 0;
	//start angle (relative)
	var sa = (typeof(sa)!=='undefined') ? sa : 0;
	//end angle (relative)
	var ea = (typeof(ea)!=='undefined') ? ea : 2*Math.PI;
	//counter clockwise
	var c = (typeof(c)!=='undefined') ? c : false;
	switch(r){
		case 0: 		//position: center
			break; 		
		case 1:			//position: left
			px -= R;
			break;
		case 2: 		//position: bottom
			py += R;
			sa += 0.5*Math.PI;
			ea += 0.5*Math.PI;
			break;
		case 3: 		//position: right
			px += R;
			sa += Math.PI;
			ea += Math.PI;
			break;
		case 4:			//position: top
			py -= R;
			sa += 1.5*Math.PI;
			ea += 1.5*Math.PI;
			break;
		default: 		//position: center
			break;
	}
	//prevent lines to start position
	cx.beginPath();
	cx.arc(px,py,R,sa,ea,c);
	//if circle is partial arc then this will close it
	//cx.closePath();
	//add stroke
	cx.stroke();
}
function triangle(cx,pos,r){
	cx.beginPath();
	if(typeof r !== 'undefined'){
		pos = typeof pos !== 'undefined' ? pos : {x:0,y:0};
		pos.x = typeof pos.x !== 'undefined' ? pos.x : 0;
		pos.y = typeof pos.y !== 'undefined' ? pos.y : 0;
		cx.moveTo(pos.x,pos.y-r*1);
		cx.lineTo(pos.x+(r*Math.sqrt(3)/2),pos.y+r/2);
		cx.lineTo(pos.x-(r*Math.sqrt(3)/2),pos.y+r/2);
		cx.lineTo(pos.x,pos.y-r*1);
	} else {
		pos[0].x = typeof pos[0].x !== 'undefined' ? pos[0].x : 0;
		pos[0].y = typeof pos[0].y !== 'undefined' ? pos[0].y : 0;
		pos[1].x = typeof pos[1].x !== 'undefined' ? pos[1].x : 0;
		pos[1].y = typeof pos[1].y !== 'undefined' ? pos[1].y : 0;
		pos[2].x = typeof pos[2].x !== 'undefined' ? pos[2].x : 0;
		pos[2].y = typeof pos[2].y !== 'undefined' ? pos[2].y : 0;
		cx.moveTo(pos[0].x,pos[0].y);
		cx.lineTo(pos[1].x,pos[1].y);
		cx.lineTo(pos[2].x,pos[2].y);
		cx.lineTo(pos[0].x,pos[0].y);
	}
	//cx.closePath();
	cx.stroke();
}

ball = function(cx, rad, pos, vel, acl, interaction, terminal){
	var that = this;
	this.cx = cx;
	if(cx==='undefined'){
		return false;
	}
	this.rad = typeof(rad)!=='undefined' ? rad : 1;
	pos = typeof(pos)!=='undefined' ? pos : {x:0,y:0};
	vel = typeof(vel)!=='undefined' ? vel : {x:0,y:0};
	acl = typeof(acl)!=='undefined' ? acl : {x:0,y:0};
	this.pos = new Vector(pos.x,pos.y);
	this.vel = new Vector(vel.x,vel.y);
	this.acl = new Vector(acl.x,acl.y);
	this.interaction = interaction;
	this.term = typeof(terminal)!=='undefined' ? terminal : 0;
	this.update = function(){
		if(that.term > 0){
			that.vel = (that.vel.y<that.term) ? that.vel.add(that.acl) : that.vel;
			that.pos.add(that.vel);
		} else {
			that.vel.add(that.acl);
			that.pos.add(that.vel);
		}
		if(typeof(that.interaction !== 'undefined')){
			if(that.interaction.behavior == 'cont'){
				that.pos.x = that.pos.x<that.interaction.x ? that.pos.x : that.interaction.reset.x;
				that.pos.y = that.pos.y<that.interaction.y ? that.pos.y : that.interaction.reset.y;
			} else if(that.interaction.behavior == 'bounce'){
				if(that.pos.x >= that.interaction.x){
					that.vel.x *= -1;
					that.pos.x = that.interaction.x;
				}
				if(that.pos.y >= that.interaction.y){
					that.vel.y *= -1; 
					that.pos.y = that.interaction.y;
					//that.vel.y -= that.vel.y/10;
				}
			}
		}
		return that;
	}
	this.draw = function(){
		circle(that.cx,that.pos.x,that.pos.y,that.rad);
		cx.fill();
	}
	return this;
};