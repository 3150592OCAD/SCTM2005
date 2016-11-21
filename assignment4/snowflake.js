Math.TAU = Math.PI*2

let Snowflake = {
	Tsize: 3,
	Asize: 3,
	Nnodes: 5,
	pos: new Vector(),
	vel: new Vector(),
	acl: new Vector(),
	update: function(){
		this.vel = this.vel.add(this.acl)
		this.pos = this.pos.add(this.vel)
	},
	draw: function(cx){
		this.Asize = this.Tsize * this.pos.z
		cx.beginPath()
		let shape = polygon(this.pos,this.Asize,this.Nnodes)
		shape.forEach(node=>{
			cx.moveTo(this.pos.x,this.pos.y)
			cx.lineTo(node.x,node.y)
		})
		cx.stroke()
	}
}
function makeSnow(){
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	const snowflake  = Object.create(Snowflake)
	snowflake.Tsize  = rand(3,5)
	snowflake.Nnodes = randInt(5,8)
	return snowflake
}

function polygon(origin,radius,points){
	let nodes = []
	for(let i=points;i--;){
		a = (Math.TAU/points)*i
		nodes.push({
			x: (Math.cos(a)*radius)+origin.x,
			y: (Math.sin(a)*radius)+origin.y
		})
	}
	return nodes
}
function rand(min=0,max=1){
	return min+(Math.random()*(max-min))
}
function randInt(min,max){
	return Math.round(rand(min,max))
}