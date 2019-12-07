"use strict"; // interpret document contents in JavaScript strict mode

// TODO: add text on top of the images.
// TODO: add symbols for slidCntrl class. Maybe a googlefont cdn or something like that.

var slide = document.querySelectorAll(".slide");	// Query all .slide elements in the DOM and save into a nodelist object.
var i = 0;											// Saves the current slide number;
var playing = true;									// Initializes variable representing whether the slideshow is playing.
var interval = setInterval(next, 3000);				// Initializes and Sets the nextSlide function to execute every 3 seconds.
/*
 * Name        : slideN(n)
 * Parameters  : Position of slide in slide node list that wants to be displayed.
 * Processes   : Goes to the slide provided in the argument in the slide node list.
 * Return Value: None.
 */
function slideN(n) {
	slide[i].className = "slide";					// Modifies current slide class to make it non visible.
	i = (n + slide.length)%slide.length;			// Increments index of slide by 1 ensuring that it stays within the slide node list objects range.
	slide[i].className = "slide visible";			// Assigns visible class to new current slide.
}

/*
* Name        : previous()
* Parameters  : None.
* Processes   : Pauses the slideshow and makes the previous slide visible.
* Return Value: None.
*/
function previous() {
	slideN(i - 1);									// Calls previous slide.
}

/*
* Name        : next()
* Parameters  : None.
* Processes   : Pauses the slideshow and makes the next slide visible.
* Return Value: None.
*/
function next() {
	slideN(i + 1);									// Calls the next slide.
}

/*
 * Name        : pause()
 * Parameters  : None.
 * Processes   : Pauses the slideshow.
 * Return Value: None.
 */
function pause() {
	
	var pauseBtn = document.getElementById("pause");// Locates the pause button on DOM.
	var playBtn = document.getElementById("play");	// Locates the play button on DOM.
	if (playing == true) {							// Verifies that slideshow is playing.
		pauseBtn.style.cursor="not-allowed";		// Dissallows the use of the pause button for usability.
		playBtn.style.cursor="auto";				// Allows the use of the play button for usability.
		playing = false;							// Informs global variable that slideshow isn't playing.
		clearInterval(interval);					// Clears the interval to stop executing the next function.
	}
	
}

/*
* Name        : play()
* Parameters  : None.
* Processes   : Plays the slideshow.
* Return Value: None.
*/
function play() {
	
	var playBtn = document.getElementById("play");	// Locates the play button on DOM.
	var pauseBtn = document.getElementById("pause");// Locates the pause button on DOM.
	if (playing == false) {							// Verifies that the slide show is playing.
		playBtn.style.cursor="not-allowed";			// Dissallows the use of the play button for usability.
		pauseBtn.style.cursor = "auto";				// Allows use of the use of the pause button for usability
		playing = true;								// Informs the global variable that the slide show is playing.
		interval = setInterval(next, 3000);			// Re-initializes the interval to start executing the next function.
	}
	
}

/*
* Name        : createEventListeners()
* Parameters  : None.
* Processes   : Creates a series of event listeners to trigger functions in this program.
 * Return Value: None.
 */
function createEventListeners() {							// Creates event listeners.
	
	// Event Listener for pause().
	var pauseBtn = document.getElementById("pause");		// Locates and assigns the pause button.
	if (pauseBtn.addEventListener) {						// If addEventListener is available.
		pauseBtn.addEventListener("click", pause, false);	// Adds the event listener to execute pause onclick.
	} else if (pauseBtn.attachEvent) {						// If attachEvent is available.
		pauseBtn.attachEvent("onclick", pause);				// Attaches the event listener to execute pause on click.
	}
	
	// Event Listener to play().
	var playBtn = document.getElementById("play");			// Locates and assigns the play button.
	if (playBtn.addEventListener) {							// If addEventListener is available.
		playBtn.addEventListener("click", play, false);		// Adds the event listener to execute play onclick.
	} else if (playBtn.attachEvent) {						// If attachEvent is available.
		playBtn.attachEvent("onclick", play);				// Attaches the event listener to execute play on click.
	}
	
	// Event Listener for previous().
	var previousBtn = document.getElementById("previous");	// Locates and assigns the previous button.
	if (previousBtn.addEventListener) {						// If addEventListener is available.
		previousBtn.addEventListener("click", previous, false);// Adds the event listener to execute previous onclick.
	} else if (previousBtn.attachEvent) {
		previousBtn.attachEvent("onclick", previous);		// Attaches the event listener to execute previous on click.
	}
	// Event Listener to next().
	var nextBtn = document.getElementById("next");			// Locates and assigns the next button.
	if (nextBtn.addEventListener) {							// If addEventListener is available.
		nextBtn.addEventListener("click", next, false);		// Adds the event listener to execute next onclick.
	} else if (nextBtn.attachEvent) {						// If attachEvent is available.
		nextBtn.attachEvent("onclick", next);				// Attaches the event listener to execute next on click.
	}
	
	
	
	
}

// Call createEventListeners on window load.
if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", createEventListeners);
}
