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

$("#btn-play").click(function() {
	btnChange();

	$(function() {
		$.ajax({
			url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
			type: 'GET',
			datatype: 'json',
// ----
			success: function(data) {
				var a = JSON.parse(data);
				$("#quote, #author").hide(1000);
				$("#quote").queue(function(n) {
					$("#quote").hide().html(a.quote).show(2000);
					$("#author").hide().html("<i>" + a.author + "</i>").delay(2500).fadeIn(2000);
					n();
				}).delay(1000);
				var quote = a.quote;
				var author = a.author;
				$('#tweet-btn').attr('href', "https://twitter.com/intent/tweet?text=" + quote + "%20-" + author);
				console.log(quote, author)
			},
//---
			error: function(err) { var a = (err); },
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "exvrshy62omshQHYcMyYGdVisCIpp1QnSZajsnsSEmXQC6zE6m");
			}
		});
	});
});