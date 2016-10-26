// Author: Nic Hull
// Last Updated: October 2016
document.addEventListener('DOMContentLoaded', scrolling, false);
function scrolling(){
	let tabsOn = false;
	const links = document.querySelectorAll('#navbar-container a');
	for(let i=links.length;i--;){
		links[i].onclick = function (e){
			let r =  tabsOn ? tabs('section',e.target.hash.substr(1)) : false;
			e.preventDefault();
			let offsetTop = document.getElementById(e.target.hash.substr(1)).getBoundingClientRect().top + window.pageYOffset;
			window.scrollTo(0,offsetTop-document.getElementById('dynamic-navbar').offsetHeight);
		};
	}
	const button = document.querySelectorAll('#button-1 a')[0].onclick = function(e){
		e.preventDefault();
		if(tabsOn){
			tabsOn = false;
			e.target.innerHTML="Use Tabs";
			var r = scroll('section');
		} else {
			tabsOn = true;
			e.target.innerHTML="Use Scroll";
		}
	};
}
/////    Old JQuery Code  /////
// $(document).ready(function() {
// 	var tabsOn=false;
// 	$('#navbar-container a').click(function (e) {
// 		var r = tabsOn ? tabs('section',$(this).attr('href').substr(1)) : false;
// 		e.preventDefault();
// 		var offset = $('[id=' + $(this).attr('href').substr(1) + ']').offset();
// 		$('html, body').animate({ scrollTop: offset.top - $('#dynamic-navbar').outerHeight() },'fast');

// 	});
// 	$('#button-1 a').click(function (e) {
// 		e.preventDefault();
// 		if(tabsOn){
// 			tabsOn=false;
// 			$(this).html('Use Tabs');
// 			var r = scroll('section');
// 		} else {
// 			tabsOn=true;
// 			$(this).html('Use Scoll');
// 		}
// 	});
	function tabs (hide_elements,show_element) {
	    hide_elements = document.querySelectorAll(hide_elements);
	    show_element = document.getElementById(show_element);
	    hide_elements = hide_elements.length ? hide_elements : [hide_elements];
	    for (var index = 0; index < hide_elements.length; index++) {
	        hide_elements[index].style.display = 'none';
	    }
	    show_element.style.display = 'block';
	    return 0;
	}
	function scroll (show_elements) {
		show_elements = document.querySelectorAll(show_elements);
	    show_elements = show_elements.length ? show_elements : [show_elements];
	    for (var index = 0; index < show_elements.length; index++) {
	        show_elements[index].style.display = 'block';
	    }
	    return 0;
	}
//});