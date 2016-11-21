'use strict'
const B = createCanvas('blizzard')
B.setup = function(){
	let {c,cx,width,height} = this
	cx.fillStyle="#fff"
	this.snow = []
	for(let i=randInt(50,100);i--;){
		this.snow.push(makeSnow())
	}
	this.snow.forEach(snowflake=>{
		snowflake.pos = snowflake.pos.add(rand(0,width),rand(0,height),rand(1,5))
		snowflake.vel = snowflake.vel.add(snowflake.pos.z/4,snowflake.pos.z)
	})
	c.addEventListener('mousemove',function(evt){
		cx.strokeStyle = setSnowColour(c,evt)
	})
	return true
}
B.update = function(){
	this.snow.forEach((snowflake)=>{
		if(snowflake.pos.y >= this.height+snowflake.Asize){
			snowflake.pos.y = -snowflake.Asize
		}
		if(snowflake.pos.x >= this.width+snowflake.Asize){
			snowflake.pos.x = -snowflake.Asize
		}
		snowflake.update()
	})
}
B.draw = function(){
	let {snow,cx,width,height} = this
	cx.clearRect(0,0,width,height)
	for(let i=0;i<5;i++){
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		snow.filter(snowflake=>Math.round(snowflake.pos.z)==i).map(snowflake=>{snowflake.draw(cx)})
	}
}
function setSnowColour(canvas,evt){
	let r=0;let g=0;let b=0
	let x = evt.clientX - canvas.getBoundingClientRect().left
	let v = Math.round(255*Math.pow(Math.sin((3*(x/canvas.width*Math.TAU))/2),2))
	let p = canvas.width/6
	if(x<p){
		g=v
		r=255
	} else if(x<2*p){
		r=v
		g=255
	} else if(x<3*p){
		b=v
		g=255
	} else if(x<4*p){
		g=v
		b=255
	} else if(x<5*p){
		r=v
		b=255
	} else {
		b=v
		r=255
	}
	return "rgb("+r+","+g+","+b+")"
}