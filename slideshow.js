"use strict"; // interpret document contents in JavaScript strict mode

setInterval(showSlides, 1000);

function showSlides() {
	var i;
	var slide = document.querySelectorAll(".slide");
	for (i = 0; i < slide.length; i++) {
		if (i == 0) {
			slide[0].style.zIndex= 1;
			slide[1].style.zIndex= 3;
			slide[2].style.zIndex= 7;
			slide[3].style.zIndex= 10;
		} 
		if (i == 1) {
			slide[1].style.zIndex= 1;
			slide[2].style.zIndex= 3;
			slide[3].style.zIndex= 7;
			slide[0].style.zIndex= 10;
		} 
		if (i == 2) {
			slide[2].style.zIndex= 1;
			slide[3].style.zIndex= 3;
			slide[0].style.zIndex= 7;
			slide[1].style.zIndex= 10;
		}
		if (i == 3){
			slide[3].style.zIndex= 1;
			slide[0].style.zIndex= 3;
			slide[1].style.zIndex= 7;
			slide[2].style.zIndex= 10;
		}
	}
}
