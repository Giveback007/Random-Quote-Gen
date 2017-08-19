$(document).ready(function() {
	$("#main").fadeIn(1500);
	$("h2").delay(1000).fadeIn(2000);
});

var btnChange = (function() {
	var executed = false;
	return function() {
		if (!executed) {
			executed = true;
			$("h2").fadeOut(2000);
			$("#h2-div").delay(2000).hide(2000)
			$("#btn-text1").fadeOut(1800);
			$("#tweet-btn").fadeIn(3000);
			$("#btn-text1").queue(function(n) {
				$("#btn-text1").html('<i class="fa fa-step-forward" aria-hidden="true" style="margin:0 3px 0 3px"></i>');
				n();
			}).fadeIn(4000);
		}
	};
})();

function animation(x) {
	$("#quote, #author").hide(1000);
	$("#quote").queue(function(n) {
		$("#quote").hide().html(x.quote).show(2000);
		$("#author").hide().html("<i>" + x.author + "</i>").delay(250).fadeIn(2000);
		n();
	}).delay(1000);
}

$("#btn-play").click(function() {
	btnChange();

	$(function() {
		$.ajax({
			url: 'https://giveback007-random-quote-microservice.glitch.me/rand',
			type: 'get',
			dataType: "jsonp",
			success: function(data) {
				console.log(data);
				animation(data);

				$('#tweet-btn').attr('href', "https://twitter.com/intent/tweet?text=" + data.quote + "%20-" + data.author);

			},
//---
			error: function(err) { var a = (err); }
		});
	});
});
