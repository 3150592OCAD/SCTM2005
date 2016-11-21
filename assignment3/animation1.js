'use strict'
////	GLOBAL VARIABLES	////

const frameBased = true	// Timebased is default: need to override to use framebased animation
//const framerate = 10
const Wtotal = 1000	// Total width and heights
const Htotal = 500
const Particles1 = createCanvas('particles1',Wtotal/2,Htotal)
const Particles2 = createCanvas('particles2',Wtotal/2,Htotal)
const arr = []
for(let i=randInt(10,100); i--;){	// fill array with random values
	arr.push(new Particle(
		randInt(1000,3000),
		randInt(5,15),
		{	x:rand(0,Wtotal),
			y:rand(0,Htotal)},
		{	x:rand(-2,2),
			y:rand(-2,2)}
		)
	)
}

////	MAIN FUNCTIONS	////
function Gupdate(){	// Main update function
	// init
	Particles1.particles = []
	Particles2.particles = []
	//console.log(arr.map((v,i,a)=>v.pos.x))	// log all particle x positions
	const Adrag = 10
	const gravity = 30
	for(let i=arr.length;i--;){
		let {acl,mas,pos,vel,rad} = arr[i]
		{	// physics
			let forces = {
				x: [],
				y: []
			}
			collisions(arr[i])
			drag(arr,forces,i)
			acl.x = (isNaN(forces.x[i])?0:forces.x[i]/(Adrag/2)) / (vel.x>0 ? mas : -mas)
			acl.y = ((isNaN(forces.y[i])?0:forces.y[i]/Adrag) / (vel.y>0 ? mas : -mas)) + (9.81/(100-gravity))
		}
		{	// dividing between canvases
			if(pos.x<(Wtotal/2)+rad){
				Particles1.particles.push(arr[i])
			}
			if(pos.x>(Wtotal/2)-rad){
				Particles2.particles.push(arr[i])
			}
		}
	}
}
Particles1.setup = function(){
	this.c.addEventListener('click',function(evt){ // add particle where clicked
		Particles1.mousePos = getMousePos(Particles1.c,evt)
		arr.push(new Particle(
			randInt(1000,3000),
			randInt(5,15),
			{	x: Particles1.mousePos.x,
				y: Particles1.mousePos.y},
			{	x:rand(-2,2),
				y:rand(-2,2)}
			)
		)
	},false)
	return true
}
Particles1.update = function(){
	Gupdate()
}
Particles1.draw = function(){	// draw black particles on white canvas
	this.cx.clearRect(0,0,this.width,this.height)
	for(let i=this.particles.length; i--;){
		this.particles[i].draw(this.cx,"#000000",false)
	}
}
Particles2.setup = function(){
	this.c.addEventListener('click',function(evt){ // add particle where clicked
		Particles2.mousePos = getMousePos(Particles2.c,evt)
		arr.push(new Particle(
			randInt(1000,3000),
			randInt(5,15),
			{	x: Particles2.mousePos.x+Particles1.width,
				y: Particles2.mousePos.y},
			{	x:rand(-2,2),
				y:rand(-2,2)}
			)
		)
	},false)
	return true
}
Particles2.update = function(){
	for(let i=this.particles.length;i--;){
		this.particles[i].pos.x -= Particles1.width
	}
	for(let i=arr.length;i--;){
		arr[i].update()
	}
}
Particles2.draw = function(){ // draw white particles on black canvas
	this.cx.fillRect(0,0,this.width,this.height)
	for(let i=this.particles.length; i--;){
		this.particles[i].draw(this.cx,"#ffffff",false)
		this.particles[i].pos.x += Particles1.width
	}
}

////	SUPPLEMENTARY FUNCTIONS		////
function collisions({pos,vel,rad}){
	// handle collions against vertical sides
	if(pos.x <= rad){
		vel.x *= -1
		pos.x = rad
	} else if(pos.x >= Wtotal-rad){
		vel.x *= -1
		pos.x = Wtotal-rad
	}
	// handle collions against horizontal sides
	if(pos.y <= rad){
		vel.y *= -1
		pos.y = rad
	} else if(pos.y >= Htotal-rad){
		vel.y *= -1
		pos.y = Htotal-rad
	}
}
function drag(array,forces,i){
	const Cd = 0.15 //coefficient of drag
	let A = Math.PI*Math.pow(array[i].rad,2) //frontal area
	// for some reason unicode works with var but not const????		var ρ = 1.22
	const rho  = 1.22 //fluid density
	forces.x[i] = -0.5*Cd*A*rho*Math.pow(array[i].vel.x,2)
	forces.y[i]= -0.5*Cd*A*rho*Math.pow(array[i].vel.y,2)
}
function rand(Llimit,Ulimit){
	Llimit = typeof Llimit=='number' ? Llimit : 0
	Ulimit = typeof Ulimit=='number' ? Ulimit : 1
	return Llimit+(Math.random()*(Ulimit-Llimit))
}
function randInt(Llimit,Ulimit){
	return Math.round(rand(Llimit,Ulimit))
}
function getMousePos(canvas,evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}