// Author: Nicole Hull
// Last Updated: September 2016
$(document).ready(function() {
	var tabsOn=false;
	$('#navbar-container a').click(function (e) {
		var r = tabsOn ? tabs('section',$(this).attr('href').substr(1)) : false;
		e.preventDefault();
		var offset = $('[id=' + $(this).attr('href').substr(1) + ']').offset();
		$('html, body').animate({ scrollTop: offset.top - $('#dynamic-navbar').outerHeight() },'fast');
    
	});
	$('#button-1 a').click(function (e) {
		e.preventDefault();
		if(tabsOn){
			tabsOn=false;
			$(this).html('Use Tabs');
			var r = scroll('section');
		} else {
			tabsOn=true;
			$(this).html('Use Scoll');
		}
	});
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
});