'use strict'
function Vector(x=0,y=0,z=0){
	this.x = x;
	this.y = y;
	this.z = z;
}
Vector.prototype.add = function(x=0,y=0,z=0){
	if (x instanceof Vector) {
		this.x += x.x || 0;
		this.y += x.y || 0;
		this.z += x.z || 0;
		return this;
	}
	if (x instanceof Array) {
		this.x += x[0] || 0;
		this.y += x[1] || 0;
		this.z += x[2] || 0;
		return this;
	}
	this.x += x;
	this.y += y;
	this.z += z;
	return this;
};
Vector.prototype.sub = function(x=0,y=0,z=0){
	if (x instanceof Vector) {
		this.x -= x.x || 0;
		this.y -= x.y || 0;
		this.z -= x.z || 0;
		return this;
	}
	if (x instanceof Array) {
		this.x -= x[0] || 0;
		this.y -= x[1] || 0;
		this.z -= x[2] || 0;
		return this;
	}
	this.x -= x;
	this.y -= y;
	this.z -= z;
	return this;
};
Vector.prototype.mult = function(s){
	this.x *= s;
	this.y *= s;
	this.z *= s;
	return this;
};
Vector.prototype.div = function(s){
	this.x /= s;
	this.y /= s;
	this.z /= s;
	return this;
};
Vector.prototype.mag = function(){
	magSq = this.x * this.x + this.y * this.y + this.z * this.z;
	return Math.sqrt(magSq);
};
Vector.prototype.normalize = function(){
	return this.mag() === 0 ? this : this.div(this.mag());
};
Vector.prototype.setMag = function(s){
	return this.normalize().mult(s);
};