'use strict';
function Particle(mass,radius,position,velocity,acceleration){
	const standard_density = 1
	position = 		typeof position		== 'undefined' ? {x:0,y:0} : position
	velocity = 		typeof velocity		== 'undefined' ? {x:0,y:0} : velocity
	acceleration = 	typeof acceleration	== 'undefined' ? {x:0,y:0} : acceleration
	position.x = 	typeof position.x		!='number' ? 0 : position.x
	position.y = 	typeof position.y		!='number' ? 0 : position.y
	velocity.x = 	typeof velocity.x		!='number' ? 0 : velocity.x
	velocity.y = 	typeof velocity.y		!='number' ? 0 : velocity.y
	acceleration.x=	typeof acceleration.x	!='number' ? 0 : acceleration.x
	acceleration.y=	typeof acceleration.y	!='number' ? 0 : acceleration.y
	this.pos = new Vector(position.x,position.y)
	this.vel = new Vector(velocity.x,velocity.y)
	this.acl = new Vector(acceleration.x,acceleration.y)
	this.rad = typeof radius!='number' ? 1 : radius
	this.mas = typeof mass!='number'? this.rad*standard_density : mass
}
Particle.prototype.update = function(){
	this.vel.add(this.acl)
	this.pos.add(this.vel)
}
Particle.prototype.draw = function(cx, fill, stroke){
	cx.beginPath()
	cx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2)
	if(typeof fill == 'string'){
		let orig = cx.fillStyle
		cx.fillStyle = fill
		cx.fill()
		cx.fillStyle = orig
	} else if(fill){
		cx.fill()
	}
	if(typeof stroke == 'string'){
		orig = cx.strokeStyle
		cx.strokeStyle = stroke
		cx.stroke()
		cx.strokeStyle = orig
	} else if(stroke){
		cx.stroke()
	}
}