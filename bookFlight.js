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

//!Bug: When one way is selected, the number of tickets returns to "".
//!Bug: ReturnDate label is no longer hidden when one way is selected

// Interpret Documents In Javascript Strict Mode.
"use strict";

// Global Variables
var currentDate = new Date();			// Used to store current date.
var formValidity = 0; 					// Used to verify form validity.
var summaryArray = new Array();
// Functions

/*
 * Name        : isRoundTrip()
 * Parameters  : none
 * Processes   : Checks if round trip input (input#tripOne) is selected.
 * Return Value: Boolean: True if round trip (input#tripOne) is selected, false otherwise.
 */
function isRoundTrip() {
	var roundTrip = document.getElementById("tripOne");
	if (roundTrip.checked == true) {							// Checks if round trip is selected. 
		placeReturnDate();										// Displays the return date label and input.
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
function isOneWay(){
	var oneWay = document.getElementById("tripTwo"); 
	if (oneWay.checked == true) {								// Checks if one way is selected.
		removeReturnDate();										// Hides the return date label and input.
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
		element.style.display = "none"		// Conditional to hide all elements with #returnDate in form.
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
		if (numberOfTickets <= 0){
			// document.getElementById("numTickets").value = 1;
			formValidity = 0;
			throw "Minimum number of tickets should be 1.";
		} else {
			numError.style.display = "none";
			summaryArray[0] = numberOfTickets;
			updateSummaryHeader();
			return numberOfTickets;
		}
	}
	catch(msg) {
		numError.style.display = "block";
		numError.innerHTML = "<p>" + msg + "</p>";
		formValidity = false;
	}
}

/*
 * Name        : handlePastDate()
 * Parameters  : currentDate object.
 * Processes   : 
 * Return Value: None.
 */
function handlePastDate() {
	var departureDate = document.getElementById("departureDate")
	var summaryDepartureDate = document.getElementById("summaryDepartureDate");
	var departureDateObject = new Date(departureDate.value);
	if (departureDateObject < currentDate) {
		departureDate.value = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate();
		summaryDepartureDate.value = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate();
	}
}


/*
 * Name        : departureDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function departureDateHandler() {
	var departureDate = document.getElementById("departureDate").value;
	var summaryDepartureDate = document.getElementById("summaryDepartureDate");
	summaryDepartureDate.innerText = departureDate;
	// handlePastDate();
	dateInverter();
}

/*
 * Name        : returnDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function returnDateHandler() {
	var returnDate = document.getElementById("returnDate").value;
	var summaryReturnDate = document.getElementById("summaryReturnDate");
	summaryReturnDate.innerText = returnDate;
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
	var departureDateObject = new Date(departureDate.value);		// Creates a Date element from departure date value.
	var returnDate = document.getElementById("returnDate");
	var summaryReturnDate = document.getElementById("summaryReturnDate");
	var returnDateObject = new Date(returnDate.value);				// Creates a Date element from departure date value.
	var tempDate = new Date();										// Temporary variable for the date swap.
	if (returnDateObject < departureDateObject) {					// Return date is before departure date.
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
	summary.innerHTML = ("Summary: " + (summaryArray[0]>=1?summaryArray[0]:"") + " " + (summaryArray[1]!==undefined?summaryArray[1]:"" + " Ticket"));
	(summaryArray[0]>1)?"s.":".";
}

/*
 * Name        : calculateCost()
 * Parameters  : .
 * Processes   : Populates the 
 * Return Value: None.
 */
function calculateCost() {
	const TICKETPRICE = 150;
	const TAX = 0.125
	var tax = 0.0;
	var subTotal = 0.0;
	var totalCost = 0.0;
	subTotal = TICKETPRICE * numberOfTickets();
	if(isOneWay()) {
		subTotal /= 1.85;		// Price of ticket one way ticket would have a premium over the regular cost of a 2 way ticket.
	}
	tax = (subTotal * (TAX));
	document.getElementById("summaryTax").innerText = "$" + tax.toLocaleString(undefined, {maximumFractionDigits: 2});
	totalCost = subTotal + tax;
	document.getElementById("totalCost").innerText = "$" + totalCost.toLocaleString(undefined, {maximumFractionDigits: 2});
}
/*
 * Name        : createEventListeners()
 * Parameters  : None.
 * Processes   : Creates a series of event listeners to trigger functions in this program.
 * Return Value: None.
 */
function createEventListeners() {

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