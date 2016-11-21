"use strict"
let C = []
function createCanvas(canvas,width=500,height=500,context="2d"){
	let element = {
		canvasName: canvas,
		contextType: context,
		width,
		height
	}
	C.push(element)
	return element
}