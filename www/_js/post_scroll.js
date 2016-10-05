// Author: Nicole Hull
// Last Updated: September 2016
$(document).ready(function() {
	$('#banner a').click(function (e) {
		e.preventDefault();
		var offset = $('[id=' + $(this).attr('href').substr(1) + ']').offset();
		$('html, body').animate({ scrollTop: offset.top - $('#banner').outerHeight() }, 'fast');
    
	});
});