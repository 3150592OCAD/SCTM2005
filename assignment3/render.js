"use strict"
const currentScript = document.currentScript
//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
let s = include(['setup.js',currentScript.getAttribute('run')])
s.then(render).catch(console.log.bind(console));

function include(filenames){
	filenames = seperate(filenames)
	const src = currentScript.getAttribute('src')
	return script(filenames)
	function script(url) {
	    if(url instanceof Array) {
	        var self = this, prom = [];
	        url.forEach(function(item) {
	            prom.push(script(item));
	        });
	        return Promise.all(prom);
	    }
	    return new Promise(function (resolve, reject) {
	        var r = false,
	            t = document.getElementsByTagName("script")[0],
	            s = document.createElement("script");
	        s.type = "text/javascript";
	        s.src = getPath(src)+url;
	        s.addEventListener('load',resolve,false)
	        s.onerror = s.onabort = reject;
	        t.parentNode.insertBefore(s, t);
	    });
	}
	function getPath(filename){
		const pathRegex = new RegExp('^(.*[\\\/])')
		const path = pathRegex.exec(currentScript.getAttribute('src'))
		if(path instanceof Array){
			return path[0]
		} else {
			return ''
		}
	}
	function flatten(arr) {
		if(arr instanceof Array){
		    var ret = []
		    arr.forEach((value)=>{
		    	 if(Array.isArray(value)) {
		            ret = ret.concat(flatten(value))
		        } else {
		            ret.push(value)
		        }
		    })
		} else {
			var ret = arr
		}
	    return ret
	}
	function seperate(object){
		if(object instanceof Array){
			object.forEach((value,index,arr)=>{
				arr[index] = value.split(',')
			})
		} else {
			object.split(',')
		}
		return flatten(object)
	}
}

function render(){
	C.forEach(function set(value) {
		value.c = document.createElement('canvas')
		value.c.setAttribute('id',value.canvasName)
		currentScript.parentElement.insertBefore(value.c,currentScript)
		value.c.width = value.width
		value.c.height = value.height
		value.cx = value.c.getContext(value.contextType)
		value.frame	= 0
		value.animationLimit = value.setup() || false
		//http://www.w3schools.com/js/js_errors.asp
		if(!value.animationLimit){
			try{value.draw()}catch(err){}
		}
	});
	render.timeBased = 	typeof timeBased  != 'undefined' ? timeBased : false
	render.frameBased = typeof frameBased != 'undefined' ? frameBased : false
	if(render.timeBased || !render.frameBased){
		timeRender(Date.now())
	} else {
		frameRender(typeof framerate=='undefined'?60:framerate)
	}
}
function timeRender(timestamp){
	if(!timeRender.start){
		timeRender.start = timestamp
	}
	let animating = false
	C.forEach(function animate(value){
		let now = Date.now()
		let elapsed = now-timeRender.start
		if(elapsed < value.animationLimit || value.animationLimit === true){
			animating = true
			try {
				value.update(timeRender.start, elapsed, now)
			} catch(err) {
				throw err
			} finally {
				try {
					value.draw()
				} catch(err){
					if(value.animationLimit!==false){
						console.log("function 'draw' does not exist for animation: "+value.canvasName)
						console.log(value)
						throw err
					}
				}
			}
		}
	})
	if(animating) window.requestAnimationFrame(timeRender)
}
function frameRender(framerate){
	if(!frameRender.framerate){
		frameRender.framerate = framerate
	}
	let animating = false
	C.forEach(function animate(value){
		if(value.frame++ < value.animationLimit || value.animationLimit === true){
			animating = true
			try {
				value.update()
			} catch(err){
				throw err
			} finally {
				try {
					value.draw()
				} catch(err){
					if(value.animationLimit!==false){
						console.log("function 'draw' does not exist for animation: "+value.canvasName)
						console.log(value)
						throw err
					}
				}
			}
		}
	})
	if(animating) window.setTimeout(frameRender,1000/frameRender.framerate)
}