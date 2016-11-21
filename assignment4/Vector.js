'use strict'
function Vector(x=0,y=0,z=0){
	this.x = x;
	this.y = y;
	this.z = z;
}
Vector.prototype.add = function(x=0,y=0,z=0){
	let o = Object.create(Vector.prototype)
	Object.assign(o,this)
	if (x instanceof Vector) {
		o.x += x.x || 0
		o.y += x.y || 0
		o.z += x.z || 0
		return o
	}
	if (x instanceof Array) {
		o.x += x[0] || 0
		o.y += x[1] || 0
		o.z += x[2] || 0
		return o
	}
	o.x += x
	o.y += y
	o.z += z
	return o
}
Vector.prototype.sub = function(x=0,y=0,z=0){
	let o = Object.create(Vector.prototype)
	Object.assign(o,this)
	if (x instanceof Vector) {
		o.x -= x.x || 0
		o.y -= x.y || 0
		o.z -= x.z || 0
		return o
	}
	if (x instanceof Array) {
		o.x -= x[0] || 0
		o.y -= x[1] || 0
		o.z -= x[2] || 0
		return o
	}
	o.x -= x
	o.y -= y
	o.z -= z
	return o
}
Vector.prototype.mult = function(s){
	let o = Object.create(Vector.prototype)
	Object.assign(o,this)
	o.x *= s
	o.y *= s
	o.z *= s
	return o
}
Vector.prototype.div = function(s){
	let o = Object.create(Vector.prototype)
	Object.assign(o,this)
	o.x /= s
	o.y /= s
	o.z /= s
	return o
}
Vector.prototype.rotate2D = function(a){
	let o = Object.create(Vector.prototype)
	o.x = this.x*Math.cos(a) - this.y*Math.sin(a)
	o.y = this.x*Math.cos(a) + this.y*Math.sin(a)
	return o
}
Vector.prototype.mag = function(){
	magSq = this.x * this.x + this.y * this.y + this.z * this.z
	return Math.sqrt(magSq)
}
Vector.prototype.normalize = function(){
	return this.mag() === 0 ? this : this.div(this.mag())
}
Vector.prototype.setMag = function(s){
	return this.normalize().mult(s)
}