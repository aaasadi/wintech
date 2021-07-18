(function ($) {
	'use strict';
	var help = false;
	var helpTime = 5000;

    $.fn.note = function (userOptions) {
		
		var slider = this;
        var slides = slider.find(".pub").children();
        var slideCount = slides.length;
        var i = 0;  // Current Slide Index
		
		var swipestatus = true;
		
		$(document).ready(function () {
            // Add Slide Counter
			var counterTag = $("<div>").addClass("counter");
			var stripTag = $("<div>").addClass("stripTag");
			slider.append(counterTag);
			slider.append(stripTag);
			stripTag.css({width : slider.width() / slideCount});
			showCounter(i + 1);
			function showCounter(s) {
				counterTag.html(s + " / " + slideCount);
				stripTag.css({'width' :s * (slider.width() / slideCount)});
			}
			counterTag.delay(1000).fadeOut();
			// swip slides
			function slideright(s) {
				if (s >= (slideCount - 1)) {
					$(slides[s]).animate({left:slider.width()/10},100).animate({left:0},100);
				} else {
					var nextPage = $(slides[s + 1]);
					nextPage.removeClass("slideOutLeft").addClass("animated slideInLeft active");
					showCounter(s + 2);
					i++;
				}
			}
			function slideleft(s) {
				if (s <= 0) {
					$(slides[s]).animate({left:-1 * slider.width()/10},100).animate({left:0},100);
				} else {
					var prevPage = $(slides[s - 1]);
					var currentPage = $(slides[s]);
					currentPage.addClass("animated slideOutLeft");
					prevPage.addClass("active");
					showCounter(s);
					i--;
				}
			}
			
			slider.on("dragstart", function(ev) {
				ev.preventDefault();
			});

			slider.swiperight(function (ev){
				if(swipestatus){
					slideright(i);
					help = true;
					$(".help").fadeOut().css({display: "none"});
				}
			});
			slider.swipeleft(function (ev){
				if(swipestatus){
					slideleft(i);
				}
			});
			slider.swipe(function (ev){
				counterTag.fadeIn();
				setTimeout( function() {
					counterTag.fadeOut()
				},1000);
				
			});
			$(document).keydown(function(e) {
				if(e.keyCode == 37) {
					slideright(i);
				}
				if(e.keyCode == 39) {
					slideleft(i);
				}
			});
			$("#pageList li").on("click", function(e) {
				e.preventDefault();
				var pageNumber = this.children[1].innerHTML;
				var book = $("#book .pub").children();
				i = pageNumber - 1;
				for (var j = 0; j < slideCount; j++) {
					if (j === i) {
						$(book[j]).addClass("active");
						$(book[j]).removeClass("animated");
						$(book[j]).removeClass("slideOutLeft");
						$(book[j]).removeClass("slideInLeft");
						showCounter(pageNumber);
						counterTag.fadeIn().delay(1000).fadeOut();
						return;
					}
					$(book[j]).removeClass("active");
					$(book[j]).removeClass("animated");
					$(book[j]).removeClass("slideOutLeft");
					$(book[j]).removeClass("slideInLeft");
				}
			});
			setTimeout(function(){
				if (i == 0 && !help) {
					$(".help").fadeIn().css({display: "flex"});
				}
			},helpTime);
			$(".help").on("mousedown", function() {
				if(swipestatus){
					slideright(i);
					help = true;
					$(".help").fadeOut().css({display: "none"});
				}
			});
			$(".help").swipe(function() {
				if(swipestatus){
					slideright(i);
					help = true;
					$(".help").fadeOut().css({display: "none"});
				}
			})
		});
	};
	
	$.fn.slider = function (userOptions) {
		
		var slider = this;
        var slides = slider.children();
        var slideCount = slides.length;
        var i = 0;  // Current Slide Index
		
		$(document).ready(function () {
            // Add Slide Handle
			var handle = $("<div>").addClass("handle");
			slider.append(handle);
			var leftButton = "<button id='handelLeft'><img class='icon' src='./img/iconLeftSlider.svg'/></button>";
			var rightButton = "<button id='handelRight'><img class='icon' src='./img/iconRightSlider.svg'/></button>";
			handle.html(rightButton + leftButton);
			// swip slides
			function slideright(s) {
				if (s < (slideCount - 1)) {
					var currentPage = $(slides[s]);
					var nextPage = $(slides[s + 1]);
					currentPage.removeClass("active")
					nextPage.addClass("active");
					i++;
				} else if (s = slideCount) {
					var firstSlide = $(slides[0]);
					var endSlide = $(slides[slideCount - 1]);
					firstSlide.addClass("active");
					endSlide.removeClass("active");
					i = 0;
				}
			}
			function slideleft(s) {
				if (s > 0) {
					var prevPage = $(slides[s - 1]);
					var currentPage = $(slides[s]);
					currentPage.removeClass("active");
					prevPage.addClass("active");
					i--;
				} else if (s === 0) {
					var endSlide = $(slides[slideCount - 1]);
					var firstSlide = $(slides[0]);
					firstSlide.removeClass("active");
					endSlide.addClass("active");
					i = slideCount - 1;
				}
			}
			
			handle.find("#handelLeft").click(function () {
				slideleft(i);
			});
			handle.find("#handelRight").click(function () {
				slideright(i);
			});
		});
	};

	$.fn.sliderBtn = function () {
		var buttons = this;
		var button = buttons.children()		
		$(document).ready(function () {
            button.on("click", function(e) {
				var target = e.currentTarget.id;
				var i;
				for (i=0; i < button.length; i++) {
					$(button[i]).removeClass("active");
				}
				$(button[target - 1]).addClass("active");
				var colorSlider = $("#colorSlider").children();
				console.log(colorSlider[target-1]);
				for (var z= 0; z <= colorSlider.length; z++) {
					if (z == target) {
						$(colorSlider[z-1]).addClass("active");
					} else {
						$(colorSlider[z-1]).removeClass("active");
					}
				}
			});
		});	
	};
})(jQuery);