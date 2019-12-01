//	* File Name   : bookFlight.js
//	* Name        : Team 1
//	* Course      : 202010-COP-2830C-15165 Valencia College
//	* Facilitator : David Stendel
//	* Description : HTML Provided by Cengeage
//	* Team Members: Alvaro Bolanos, Ashley McCray, Raymond Ynoa, Israel Mendez Crespo
//	* Date        : 2019/10/30

//TODO: Validate first and last name: > 2 characters and make required in html.
//TODO: Validate email and make required in html.
//TODO: Summary header in calculated costs.
//TODO: Round trip and one way should stay colored when selected.

// Interpret Documents In Javascript Strict Mode.
"use strict";

// Global Variables
var currentDate = new Date();   // Used to store current date.
var summaryArray = new Array(); // Used to store summary elements.

// Functions

/*
 * Name        : validateName()
 * Parameters  : none
 * Processes   : Checks if a name is valid.
 * Return Value: Boolean: True if a name is valid, false otherwise.
 */

function validateFirstName() {
	var inputFirstName = document.getElementById["firstName"];
	var inputLastName = document.getElementById["lastName"];
	var nameFormat = /[\w-]{2,}$/;								// At least 
	try {
		if(nameFormat.test(inputFirstName) === false) {
			throw "Please ensure that your name is at least 2 characters long.";
		} else {
			firstNameError.style.display = "none";
		}
		if(nameFormat.test(inputLastName) === false) {
			throw "Please ensure that your last name is at longer 2 characters long.";
		} else {
			lastNameError.style.display = "none";
		}
	} catch(msg) {
		firstNameError.style.display = "block";
		firstNameError.innerHTML = "<p>" + msg + "</p>";
		lastNameError.style.display = "block";
		
	}
}

/*
 * Name        : validateEmail()
 * Parameters  : none
 * Processes   : Checks if an email is valid.
 * Return Value: Boolean: True if an email is valid, false otherwise.
 */

 function validateEmail() {
	var inputEmail = document.getElementById("email").value;
	var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	try {
		if(emailFormat.test(inputEmail) === false) {
			throw "Please enter a valid email.";
		} else {
			emailError.style.display = "none";
			return true;
		}
	} catch(msg) {
		emailError.style.display = "block";
		emailError.innerHTML = "<p>" + msg + "</p>";
	}
}

/*
 * Name        : isRoundTrip()
 * Parameters  : none
 * Processes   : Checks if round trip input (input#tripOne) is selected.
 * Return Value: Boolean: True if round trip (input#tripOne) is selected, false otherwise.
 */
function isRoundTrip() {
	var roundTrip = document.getElementById("tripOne");
	if (roundTrip.checked == true) { // Checks if round trip is selected. 
		placeReturnDate();              // Displays the return date label and input.
		resetTicketData();
		summaryArray[1] = "Round Trip";
		return true;
	} else {
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
	var oneWay = document.getElementById("tripTwo");
	if (oneWay.checked == true) { // Checks if one way is selected.
		removeReturnDate();          // Hides the return date label and input.
		resetTicketData();
		summaryArray[1] = "One Way";
		return true;
	} else {
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
	var selectedElements = document.querySelectorAll(".removeReturnDate");
	selectedElements.forEach(element => {
		element.style = "inherit";
	});
}

/*
 * Name        : resetTicketData()
 * Parameters  : none
 * Processes   : Reset's ticketing data.
 * Return Value: None.
 */
function resetTicketData() {
	document.getElementById("departureDate").value = "";
}

/*
 * Name        : numberOfTickets()
 * Parameters  : none
 * Processes   : Extracts the value of the #numTickets input.
 * Return Value: Int: number of tickets to purchase.
 */
function numberOfTickets() {
	var numberOfTickets = document.getElementById("numTickets").value;
	var summaryNumberOfTickets = document.getElementById("summaryNumberOfTickets");
	var numError = document.getElementById("numTicketsError");
	summaryNumberOfTickets.innerText = numberOfTickets;
	try {
		if (numberOfTickets <= 0) {
			// document.getElementById("numTickets").value = 1;
			++formValidity;
			throw "Minimum number of tickets should be 1.";
		} else {
			numError.style.display = "none";
			summaryArray[0] = numberOfTickets;
			updateSummaryHeader();
			return numberOfTickets;
		}
	} catch (msg) {
		numError.style.display = "block";
		numError.innerHTML = "<p>" + msg + "</p>";

	}
}

/*
 * Name        : handlePastDate()
 * Parameters  : currentDate object.
 * Processes   : 
 * Return Value: None.
 */
function handlePastDate() {
	var departureDate = document.getElementById("departureDate");
	var returnDate = document.getElementById("returnDate");
	var summaryDepartureDate = document.getElementById("summaryDepartureDate");
	var summaryReturnDate = document.getElementById("summaryReturnDate");
	var departureDateObject = new Date(departureDate.value);
	var returnDateObject = new Date(returnDate.value);

	if (departureDateObject < currentDate) {
		var stringDeparturDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate(); // Adds a zero to match browser format for single digit date: i.e. yyyy-mm-d -> yyyy-mm-"0"d.
		departureDate.value = stringDeparturDate;
		summaryDepartureDate.innerText = stringDeparturDate;
	}

	// if (returnDateObject < departureDateObject) {
	// 	var stringReturnDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + ((currentDate.getDate() + 1) < 10 ? "0" : "") + currentDate.getDate();
	// 	returnDate.value = stringReturnDate;
	// 	summaryReturnDate.innerText = stringReturnDate;
	// }
}

/*
 * Name        : departureDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function departureDateHandler() {
	// var departureDate = document.getElementById("departureDate").value;
	// var summaryDepartureDate = document.getElementById("summaryDepartureDate");
	// summaryDepartureDate.innerText = departureDate;
	handlePastDate();
	dateInverter();
}

/*
 * Name        : returnDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function returnDateHandler() {
	// var returnDate = document.getElementById("returnDate").value;
	// var summaryReturnDate = document.getElementById("summaryReturnDate");
	// summaryReturnDate.innerText = returnDate;
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
	if (returnDateObject < departureDateObject) {            // Return date is before departure date.
		tempDate = departureDate.value;
		departureDate.value = returnDate.value;
		summaryDepartureDate.innerText = returnDate.value;
		returnDate.value = tempDate;
		summaryReturnDate.innerText = tempDate;
		window.alert("Please note that the dates selected seem incorrect.\n\nThe dates will be  inverted for your convenience.\n\nPlease review them carefully.");
	}
}

/*
 * Name        : updateSummaryHeader()
 * Parameters  : None.
 * Processes   : Populates the calculated cost section header.
 * Return Value: None.
 */
function updateSummaryHeader() {
	var summary = document.getElementById("summaryHeader");
	summary.innerHTML = ("Summary: " + (summaryArray[0] >= 1 ? summaryArray[0] : "") + " " + (summaryArray[1] !== "" ? summaryArray[1] : "" + " Ticket"));
	(summaryArray[0] > 1) ? "s." : ".";
}

/*
 * Name        : calculateCost()
 * Parameters  : .
 * Processes   : Calculates the cost based on the number of travelers.
 * Return Value: None.
 */
function calculateCost() {
	const TICKETPRICE = 150;
	const TAX = 0.125
	var tax = 0.0;
	var subTotal = 0.0;
	var totalCost = 0.0;
	subTotal = TICKETPRICE * numberOfTickets();
	if (isOneWay()) {
		subTotal /= 1.85; // Price of ticket one way ticket would have a premium over the regular cost of a 2 way ticket.
	}
	tax = (subTotal * (TAX));
	document.getElementById("summaryTax").innerText = "$" + tax.toLocaleString(undefined, {
		maximumFractionDigits: 2
	});
	totalCost = subTotal + tax;
	document.getElementById("totalCost").innerText = "$" + totalCost.toLocaleString(undefined, {
		maximumFractionDigits: 2
	});
}
/*
 * Name        : createEventListeners()
 * Parameters  : None.
 * Processes   : Creates a series of event listeners to trigger functions in this program.
 * Return Value: None.
 */
function createEventListeners() {

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