"use strict"; // interpret document contents in JavaScript strict mode

// TODO: fix play(). Currently able to pause, but unable to play. Seems like it's calling pause instead of play but don't know why. 
// TODO: add next and previous buttons.
// TODO: add text on top of the images.
// TODO: add symbols for slidCntrl class. Maybe a googlefont cdn or something like that.

var slide = document.querySelectorAll(".slide");	// Query all .slide elements in the DOM and save into a nodelist object.
var i = 1;											// Saves the current slide number;
var playing = true;									// Initializes variable representing whether the slideshow is playing.
var interval = setInterval(nextSlide, 3000)			// Initializes and Sets the nextSlide function to execute every 3 seconds.

function nextSlide() {
	slide[i].className = "slide";					// Make the fromerly visible slide, no longer visible.
	i = (i+1)%slide.length;							// Move forward in slides but circle back to zero if i has reached the total number of slides in the slide nodelist object.
	slide[i].className = "slide visible";			// Sets the slide and visible class for the ith slide in the slide nodelist object.
}


/*
 * Name        : pause()
 * Parameters  : None.
 * Processes   : Pauses the slideshow.
 * Return Value: None.
 */
function pause() {
	
	var pauseBtn = document.getElementById("playback");
	pauseBtn.innerHTML = "Continue";
	playing = false;
	clearInterval(interval);
	
}

/*
* Name        : play()
* Parameters  : None.
* Processes   : Plays the slideshow.
* Return Value: None.
*/
function play() {
	
	var playBtn = document.getElementById("playback");
	playBtn.innerHTML = "Pause";
	playing = true;
	setInterval(nextSlide, 3000);
	
}


/*
 * Name        : createEventListeners()
 * Parameters  : None.
 * Processes   : Creates a series of event listeners to trigger functions in this program.
 * Return Value: None.
 */
function createEventListeners() {
	// Event Listener for pause().
	var pauseBtn = document.getElementById("playback");
	if (pauseBtn.addEventListener) {
		if (playing == true)
			pauseBtn.addEventListener("click", pause, false);
	} else if (pauseBtn.attachEvent) {
		if (playing == true)
			pauseBtn.attachEvent("onclick", pause);
	}
	// Event Listener to play().
	var playBtn = document.getElementById("playback");
	if (playBtn.addEventListener) {
		if (playing == false)
			playBtn.addEventListener("click", play, false);
	} else if (playBtn.attachEvent) {
		if (playing == false) 
			playBtn.attachEvent("onclick", play);
	}
	
	
	
}

// Call createEventListeners on window load.
if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", createEventListeners);
}
