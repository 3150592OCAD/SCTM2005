

Vector = function(x,y,z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

Vector.prototype.add = function(x,y,z){
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
	this.x += x || 0;
	this.y += y || 0;
	this.z += z || 0;
	return this;
};

Vector.prototype.sub = function(x,y,z){
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
	this.x -= x || 0;
	this.y -= y || 0;
	this.z -= z || 0;
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