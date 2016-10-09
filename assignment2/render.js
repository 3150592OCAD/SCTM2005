var maximalUpdateDelay = 25; // ms
var updateTimeout, now;
var CANVAS;
function animate() {
    updateTimeout = setTimeout(animate, maximalUpdateDelay);
    var delta = -now + (now = Date.now());
    if (typeof update == 'function') {
    	update(now, delta);
	}
}
function main() {
    clearTimeout(updateTimeout);
    animate(); // update the scene
    draw(); // render the scene
    requestAnimationFrame(main);
}
(function init(){
	if(typeof setup == 'function'){
		var valid = setup();
		if(valid && typeof draw == 'function'){
			main();
		}
	}
})();

function background(color){
	var prevFill = CANVAS.context['fillStyle'];
	CANVAS.context.fillStyle = color;
	CANVAS.context.fillRect(0,0,CANVAS.width,CANVAS.height);
	CANVAS.context.fillStyle = prevFill;
}

function canvas(c, cx, x, y, z){
	c = document.getElementById(c);
	cx = c.getContext(cx);
	x = typeof x !== 'undefined' ? x : 100;
	y = typeof y !== 'undefined' ? y : 100;
	z = typeof z !== 'undefined' ? z : 0;
	c.width = x;
	c.height = y;
	CANVAS = {
		canvas: c,
		context: cx, 
		width: c.width, 
		height: c.height,
		depth: z,
	};
	return CANVAS;
}