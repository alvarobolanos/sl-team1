//	* File Name   : bookFlight.js
//	* Name        : Team 1
//	* Course      : 202010-COP-2830C-15165 Valencia College
//	* Facilitator : David Stendel
//	* Description : HTML Provided by Cengeage
//	* Team Members: Alvaro Bolanos, Ashley McCray, Raymond Ynoa
//	* Date        : 2019/10/30

// Interpret Documents In Javascript Strict Mode.
"use strict";

// Global Variables
var currentDate = new Date();   // Used to store current date.
var summaryArray = new Array(); // Used to store summary elements.
var errors = 0;					// Used to store number of errors for form validation.
var formCompletion = 0;			// Used to store number of elements in form completed.

// Functions

/*
 * Name        : validateFirstName()
 * Parameters  : none.
 * Processes   : Checks if first name is valid.
 * Return Value: none.
 */

function validateFirstName() {
	var inputFirstName = document.getElementById("firstName").value;	// Gets and assigns value to store first name input.
	var nameFormat = /[\w-]{2,}/; 										// Establishes a regular expression. Word optionaly include hypen and must be 2 characters or more.
	try {																// Attempt logic.
		if(nameFormat.test(inputFirstName) === false) {					// If name input doesn't follow established format, then.
			// Throw an error.
			throw "Please ensure that your first name is at least 2 characters long.";
		} else {														// If name matches format, then.
			firstNameError.style.display = "none";						// Hide error.
			(errors <= 1) ? errors = 0 : --errors;						// If error is greater than 1, decrease by one, otherwise reset to zero.
			++formCompletion;											// Increment form completion.
			bookable();													// Verify if trip is bookable.
			return true;
		}
	} catch(msg) {														// Catch errors.
		firstNameError.style.display = "block";							// Show error.
		firstNameError.innerHTML = "<p>" + msg + "</p>";				// Write error.
		++errors;														// Increment error.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;	// If form completion is greater than 1, decrease by one, otherwise reset to zero.
		bookable();														// Verify if trip is bookable.
		return false;
	}
}

/*
 * Name        : validateLastName()
 * Parameters  : none.
 * Processes   : Checks if last name is valid.
 * Return Value: none.
 */
function validateLastName() {
	var inputLastName = document.getElementById("lastName").value;		// Gets and assigns value to store last name input.
	var nameFormat = /[\w-]{2,}/;										// Establishes a regular expression. Word optionaly include hypen and must be 2 characters or more.
	try {																// Attempt logic.
		if(nameFormat.test(inputLastName) === false) {					// If last name input doesn't match format, then.
			throw "Please ensure that your last name is at least 2 characters long.";
		} else {														// If last name input matches format, then.
			lastNameError.style.display = "none";						// Hide error.
			(errors <= 1) ? errors = 0 : --errors;						// If error is greater than 1, decrease by one otherwise reset to zero.
			++formCompletion;											// Increment form completion.
			bookable();													// Verify if trip is bookable.
			return true;
		}
	} catch(msg) {
		lastNameError.style.display = "block";							// Show error.
		lastNameError.innerHTML = "<p>" + msg + "</p>";					// Write error.
		++errors;														// Increment error.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;	// If form completion is greater than 1, decrease formcompletion otherwise reset to zero.
		bookable();														// verify if trip is bookable.
		return false;
	}
}

/*
 * Name        : validateEmail()
 * Parameters  : none
 * Processes   : Checks if an email is valid.
 * Return Value: Boolean: True if an email is valid, false otherwise.
 */

 function validateEmail() {
	var inputEmail = document.getElementById("email").value;			// Gets and assigns value to store email input.
	var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;	// Establishes regulare exrpresion for email.
	try {																// Attempt Logic.
		if(emailFormat.test(inputEmail) === false) {					// ifemail input doesn't match format, then.
			throw "Please enter a valid email.";
		} else {														// If email input matches the format, then. 
			emailError.style.display = "none";							// Hide error.
			(errors <= 1) ? errors = 0 : --errors;						// If error is greater than 1, decrease errors otherwise reset to zero.
			++formCompletion;											// Increase form completion.
			bookable();													// Verify if trip is bookable.
			return true;
		}
	} catch(msg) {
		emailError.style.display = "block";								// Show error.
		emailError.innerHTML = "<p>" + msg + "</p>";					// Write error.
		++errors;														// Increment error.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;	// If form completion is greater than 1, decrease formCompletion otherwise reset to zero.
		bookable();														// Verify if trip is bookable.
		return false;
	}
}

/*
 * Name        : isRoundTrip()
 * Parameters  : none
 * Processes   : Checks if round trip input (input#tripOne) is selected.
 * Return Value: Boolean: True if round trip (input#tripOne) is selected, false otherwise.
 */
function isRoundTrip() {
	var roundTrip = document.getElementById("tripOne");					// Gets and assigns value to store tripOne.
	var lRoundTrip = document.querySelector("[for='tripOne']");			// Gets and assigns value to store label for tripOne for roundTrip.
	var oneWay = document.getElementById("tripTwo");					// Gets and assigns value to store tripTwo.
	var lOneWay = document.querySelector("[for='tripTwo']");			// Gets and assigns value to store label for tripTwo for One-Way.
	if (roundTrip.checked == true) { 									// Checks if round trip is selected. 
		lRoundTrip.classList.add("active");								// Adds class active to lRoundTrip selector.
		oneWay.checked == false;										// Sets oneWay as not checked.
		lOneWay.classList.remove("active");								// Removes active class to oneWay's label.
		placeReturnDate();												// Displays the return date label and input.
		resetTicketData();												// Resets ticket departure date information.
		summaryArray[1] = "Round Trip";									// Sets Round trip string to populate cost summary.
		updateSummaryHeader();											// Updates the summary header.
		calculateCost();												// Re-calculates cost.
		bookable();														// Verify if trip is bookable.
		return true;
	} else {															// If roundTrip is not selected.
		return false;
	}
}

/*
 * Name        : isOneWay()
 * Parameters  : none
 * Processes   : Checks if round trip input (input#tripTwo) is selected.
 * Return Value: Boolean: True if round trip (input#tripTwo) is selected, false otherwise.
 */
function isOneWay() {
	var roundTrip = document.getElementById("tripOne");					// Gets and assigns value to store tripOne.
	var lRoundTrip = document.querySelector("[for='tripOne']");			// Gets and assigns value to store label for tripOne for roundTrip.
	var oneWay = document.getElementById("tripTwo");					// Gets and assigns value to store tripTwo.
	var lOneWay = document.querySelector("[for='tripTwo']");			// Gets and assigns value to store label for tripTwo for oneWay.
	if (oneWay.checked == true) { 										// Checks if one way is selected.
		lOneWay.classList.add("active");								// Adds class active to lRoundTrip selector.
		roundTrip.checked == false;										// Sets roundTrip as not checked.
		lRoundTrip.classList.remove("active");							// Removes active class to roundTrip label.
		removeReturnDate();												// Hides the return date label and input.
		resetTicketData();												// Resets ticket departure date information.
		summaryArray[1] = "One Way";									// Sets One Way trip string to populate cost summary.
		updateSummaryHeader();											// Updates the summary.
		calculateCost();												// Re-calculates cost.
		bookable();														// Verify if trip is bookable.
		return true;
	} else {															// If oneWay is not selected.
		return false;
	}
}

/*
 * Name        : removeReturnDate()
 * Parameters  : none
 * Processes   : Removes return data input field and label if trip is one way.
 * Return Value: None.
 */
function removeReturnDate() {
	var selectedElements = document.querySelectorAll(".removeReturnDate");
	selectedElements.forEach(element => {
		element.style.display = "none" // Conditional to hide all elements with #returnDate in form.
	});
}

/*
 * Name        : placeReturnDate()
 * Parameters  : none
 * Processes   : Places return data input field and label if trip is round trip.
 * Return Value: None.
 */
function placeReturnDate() {
	var selectedElements = document.querySelectorAll(".removeReturnDate");	// Queries all elements with .removeReturnDate class and stores a node list object in selected Elements.
	selectedElements.forEach(element => {									// Each element gets style inherit from parent node which is displayed.
		element.style = "inherit";
	});
}

/*
 * Name        : resetTicketData()
 * Parameters  : none
 * Processes   : Resets ticketing data.
 * Return Value: None.
 */
function resetTicketData() {
	document.getElementById("departureDate").value = "";				// Resets value of departureDate.
}

/*
 * Name        : numberOfTickets()
 * Parameters  : none
 * Processes   : Extracts the value of the #numTickets input.
 * Return Value: Int: number of tickets to purchase.
 */
function numberOfTickets() {
	var numberOfTickets = document.getElementById("numTickets").value;				// Gets and assigns value of number of tickets input.
	var summaryNumberOfTickets = document.getElementById("summaryNumberOfTickets");	// Gets and assigns value of number of tickets in the summary.
	var numError = document.getElementById("numTicketsError");						// Gets and assigns number of tickets error for user feedback.
	summaryNumberOfTickets.innerText = numberOfTickets;								// Populates number of tickets in the summary section.
	try {																			// Attempt logic.
		if (numberOfTickets <= 0) {													// Validation for negative or zero value.
			throw "Minimum number of tickets should be 1.";
		} else {																	// Validation for positive values.
			numError.style.display = "none";										// Hide error.
			summaryArray[0] = numberOfTickets;										// Sets number of tickets strig to populate cost summary.
			updateSummaryHeader();													// Updates the summary header.
			(errors <= 1) ? errors = 0 : --errors;									// If error is greater than 1, decrease errors otherwise reset to zero.
			++formCompletion;														// Increase form completion.
			return numberOfTickets;
		}
	} catch (msg) {
		++errors;																	// Increase erors.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;				// If formCompletion is greater than 1, decrease formCompletion othwerwise reset to zero.
		numError.style.display = "block";											// Show error.
		numError.innerHTML = "<p>" + msg + "</p>";									// Write error.
		bookable();																	// Verifies if trip is bookable.
	}
}

/*
 * Name        : handlePastDate()
 * Parameters  : currentDate object.
 * Processes   : 
 * Return Value: None.
 */
function handlePastDate() {
	var departureDate = document.getElementById("departureDate");					// Gets and stores departureDate input.
	var returnDate = document.getElementById("returnDate");							// Gets and stores returnDate input.
	var summaryDepartureDate = document.getElementById("summaryDepartureDate");		// Gets and stores departureDate in summary.
	var summaryReturnDate = document.getElementById("summaryReturnDate");			// Gets and stores returnDate in summary.
	var departureDateObject = new Date(departureDate.value);						// Creates a date object from the departure date value.
	var returnDateObject = new Date(returnDate.value);								// Creates a date object from the return date value.

	if (departureDateObject < currentDate) {										// If selected departure date is less than currentDate.
		var stringDeparturDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate(); // Converts current date to usable format by adding a zero for single digit date: i.e. yyyy-mm-d -> yyyy-mm-"0"d.
	}
}

/*
 * Name        : departureDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function departureDateHandler() {
	handlePastDate();						// Ensures that a past date is handled.
	dateInverter();							// Inverts dates if necessary.
}

/*
 * Name        : validateDepartureDate()
 * Parameters  : none
 * Processes   : Reports errors if departure date is in the past.
 * Return Value: none
 */
function validateDepartureDate() {
	var departureDate = document.getElementById("departureDate").value;		// Gets and stores value of departureDate.
	var departureDateError = document.getElementById("departureDateError");	// Gets and stores departureDateError element.
	var departureDateObject = new Date(departureDate);						// Creates a departureDateObject from departureDate.
	var returnDate = document.getElementById("returnDate").value;			// Gets and stores value of returnDate.
	var summaryDepartureDate = document.getElementById("summaryDepartureDate");// Gets and stores departureDate in summary.

	try {																	// Attempt logic.
		if (currentDate > departureDateObject) {							// 
			throw "The current departure date is not valid. Please select a new departure date";
		} else {
			departureDateError.style.display = "none";
			++formCompletion;
			(errors <= 1) ? errors = 0 : --errors;
			bookable();
		}
	} catch (msg) {
		departureDateError.style.display = "block";
		departureDateError.innerHTML = "<p>" + msg + "</p>";
		++errors;
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;
		bookable();
	}
}

/*
 * Name        : returnDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function returnDateHandler() {
	handlePastDate();
	dateInverter();
}

/*
 * Name        : dateInverter()
 * Parameters  : none
 * Processes   : Converts user input to date objects for comparison and inverts the dates if needed.
 * Return Value: none
 */
function dateInverter() {
	var departureDate = document.getElementById("departureDate");
	var summaryDepartureDate = document.getElementById("summaryDepartureDate");
	var departureDateObject = new Date(departureDate.value); // Creates a Date element from departure date value.
	var returnDate = document.getElementById("returnDate");
	var summaryReturnDate = document.getElementById("summaryReturnDate");
	var returnDateObject = new Date(returnDate.value);       // Creates a Date element from departure date value.
	var tempDate = new Date();                               // Temporary variable for the date swap.
	var departureDateError = document.getElementById("departureDateError");
	if (returnDateObject < departureDateObject) {            // If Return date is before departure date.
		tempDate = departureDate.value;						// Backup departureDate value.
		departureDate.value = returnDate.value;				// DepartureDate gets returnDate value.
		summaryDepartureDate.innerText = returnDate.value;	// Update the summary with new departureDate.
		returnDate.value = tempDate;						// Assign backed up departureDate to return value there by swapping.
		summaryReturnDate.innerText = tempDate;				// Update the summary with new returnDate.
		window.alert("Please note that the dates selected seem incorrect.\n\nThe dates will be  inverted for your convenience.\n\nPlease review them carefully.");	// Alert the user.
	}
	validateDepartureDate();								// Ensures errors are reported if departure date is in the past.
}

/*
 * Name        : updateSummaryHeader()
 * Parameters  : None.
 * Processes   : Populates the calculated cost section header.
 * Return Value: None.
 */
function updateSummaryHeader() {
	var summary = document.getElementById("summaryHeader");		// Gets and assigns the summary header into summary.
	// Concatenate the Summary with numTickets and tripOne or tripTwo. Gets RoundTrip by Default.
	summary.innerHTML = ("Summary: " + (summaryArray[0] >= 1 ? summaryArray[0] : "") + " ");
	summary.innerHTML += (summaryArray[1] !== undefined ? summaryArray[1] : "Round Trip") + " Ticket";
	summary.innerHTML += (summaryArray[0] > 1) ? "s." : ".";
}

/*
 * Name        : calculateCost()
 * Parameters  : .
 * Processes   : Calculates the cost based on the number of travelers.
 * Return Value: None.
 */
function calculateCost() {
	const TICKETPRICE = 150;								// Defines ticket price constant.
	const TAX = 0.125										// Defines tax constant.
	var tax = 0.0;											// Initializes tax value.
	var subTotal = 0.0;										// Initializes subTotal value.
	var totalCost = 0.0;									// Initializes totalCost value.
	subTotal = TICKETPRICE * numberOfTickets();				// Calculates subtotal based on number of tickts.
	if (document.getElementById("tripTwo").checked) {		// If is oneWay trip, then.
		subTotal /= 1.85; 									// Price of ticket one way ticket would have a premium over the regular cost of a 2 way ticket.
	}
	tax = (subTotal * (TAX));								// Calculate tax value.
	document.getElementById("summaryTax").innerText = "$" + tax.toLocaleString(undefined, {
		maximumFractionDigits: 2							// Localize and write amount of tax in summary with 2 decimal positions.
	});
	totalCost = subTotal + tax;
	document.getElementById("totalCost").innerText = "$" + totalCost.toLocaleString(undefined, {
		maximumFractionDigits: 2							// Localize and write total cost amount in summary with 2 decimal positions.
	});
	bookable();
}

/*
 * Name        : bookable()
 * Parameters  : None.
 * Processes   : Reviews form to establish if trip can be booked.
 * Return Value: None.
 */
function bookable() {
	var purchaseButton = document.getElementById("purchaseButton");		// Gets and stores purchaseButton element.
	if (errors == 0 && formCompletion >=5 ) {							// If there are no errors and form has been completed, then.
		if (document.getElementById("firstName").value != "")			// Double check name is not null.
			if (document.getElementById("lastName").value != "")		// Double check last name is not null.
				if (document.getElementById("email").value != "")		// Double check email is not null.
					if (document.getElementById("departureDate").value !== "")	// Double check departure date is filled.
						if (summaryArray[1]!== ""){						// Double check tripType is in summary.
							purchaseButton.classList.add("enable");		// Enable the purchase tickets button.
							return true;
				}
	} else {
		purchaseButton.classList.remove("enable");
		return false;
	}
}
/*
 * Name        : createEventListeners()
 * Parameters  : None.
 * Processes   : Creates a series of event listeners to trigger functions in this program.
 * Return Value: None.
 */
function createEventListeners() {

	// Event Listener for validateFirstName().
	var validFirstName = document.getElementById("firstName");
	if (validFirstName.addEventListener) {
		validFirstName.addEventListener("change", validateFirstName, false);
	} else if (validFirstName.attachEvent) {
		validFirstName.attachEvent("onchange", validateFirstName);
	}

	// Event Listener for validateLastName().
	var validLastName = document.getElementById("lastName");
	if (validLastName.addEventListener) {
		validLastName.addEventListener("change", validateLastName, false);
	} else if (validLastName.attachEvent) {
		validLastName.attachEvent("onchange", validateLastName);
	}

	// Event Listener for validateEmail().
	var validEmail = document.getElementById("email");
	if (validEmail.addEventListener) {
		validEmail.addEventListener("change", validateEmail, false);
	} else if (validEmail.attachEvent) {
		validEmail.attachEvent("onchange", validateEmail);
	}
	
	// Event Listener for isOneWay().
	var oneWay = document.getElementById("tripTwo");
	if (oneWay.addEventListener) {
		oneWay.addEventListener("click", isOneWay, false);
	} else if (oneWay.attachEvent) {
		oneWay.attachEvent("onclick", isOneWay);
	}

	// Event Listener for isRoundTrip().
	var roundTrip = document.getElementById("tripOne");
	if (roundTrip.addEventListener) {
		roundTrip.addEventListener("click", isRoundTrip, false);
	} else if (roundTrip.attachEvent) {
		roundTrip.attachEvent("onclick", isRoundTrip);
	}

	// Event Listener for numberOfTickets().
	var numberOfTickets = document.getElementById("numTickets");
	if (numberOfTickets.addEventListener) {
		numberOfTickets.addEventListener("change", calculateCost, false);
	} else if (numberOfTickets.attachEvent) {
		numberOfTickets.attachEvent("onchange", calculateCost);
	}

	// Event Listener for placeReturnDate().
	var roundTrip = document.getElementById("tripOne");
	if (roundTrip.addEventListener) {
		roundTrip.addEventListener("click", placeReturnDate, false);
	} else if (roundTrip.attachEvent) {
		roundTrip.attachEvent("onclick", placeReturnDate);
	}

	// Event Listener for departureDateHandler().
	var departureDate = document.getElementById("departureDate");
	if (departureDate.addEventListener) {
		departureDate.addEventListener("change", departureDateHandler, false);
	} else if (departureDate.attachEvent) {
		departureDate.attachEvent("onchange", departureDateHandler);
	}

	// Event Listener for returnDateHandler().
	var returnDate = document.getElementById("returnDate");
	if (returnDate.addEventListener) {
		returnDate.addEventListener("change", returnDateHandler, false);
	} else if (returnDate.attachEvent) {
		returnDate.attachEvent("onchange", returnDateHandler);
	}

}

// Call createEventListeners on window load.
if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", createEventListeners);
}