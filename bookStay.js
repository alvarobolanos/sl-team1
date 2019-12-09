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
var numNights = 0;					// Initialize number of nights as zero.
var numAdults = 0;					// Stores number of adults.
var numChildren = 0;				// Stores number of children.
var party = numAdults + numChildren;// Stores the sum of people staying in room.
var currentDate = new Date();   	// Used to store current date.
var summaryArray = new Array(); 	// Used to store summary elements.
var errors = 0;						// Used to store number of errors for form validation.
var formCompletion = 0;				// Used to store number of elements in form completed.

// Functions

/*
 * Name        : validateFirstName()
 * Parameters  : none.
 * Processes   : Checks if first name is valid.
 * Return Value: none.
 */

function validateFirstName() {
	var inputFirstName = document.getElementById("firstName").value;	// Gets and assigns value to store first name input.
	var firstNameError = document.getElementById("firstNameError");		// Gets and assigns value to first name error element.
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
	var lastNameError = document.getElementById("lastNameError");		// Gets and assigns value to last name error element.
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
	var emailError = document.getElementById("emailError");			// Gets and stores email error element.
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
 * Name        : numberOfAdults()
 * Parameters  : none
 * Processes   : Extracts the value of the #numAdults input.
 * Return Value: Int: number of tickets to purchase.
 */
function numberOfAdults() {
	var numberOfAdults = Number(document.getElementById("numAdults").value);				// Gets and assigns value of number of adults input.
	var numAdultsError = document.getElementById("numAdultsError");					// Gets and assigns number of adults error element for user feedback.
	var summaryNumAdults = document.getElementById("summaryNumAdults");				// Gets and assigns number of adults in the summary element.
	try {																			// Attempt logic.
		if (numberOfAdults < 1)													// Validation for negative or zero value.
				throw "Minimum number Adults should be 1.";
		if (numberOfAdults >2)
				throw "Maximum number of Adults should be no more than 2.";
		if (numberOfAdults >= 1) {																	// Validation for positive values.
			numAdultsError.style.display = "none";									// Hide error.
			numAdults = numberOfAdults;												// Saves number of adults to a global variable.
			summaryNumAdults.innerText = numberOfAdults;							// Populates number of tickets in the summary section.
			summaryArray[0] = numberOfAdults;										// Sets number of adults to populate cost summary.
			updateSummaryHeader();													// Updates the summary header.
			(errors <= 1) ? errors = 0 : --errors;									// If error is greater than 1, decrease errors otherwise reset to zero.
			++formCompletion;														// Increase form completion.
			return numberOfAdults;
		}
	} catch (msg) {
		++errors;																	// Increase erors.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;				// If formCompletion is greater than 1, decrease formCompletion othwerwise reset to zero.
		numAdultsError.style.display = "block";										// Show error.
		numAdultsError.innerHTML = "<p>" + msg + "</p>";							// Write error.
		bookable();																	// Verifies if trip is bookable.
	}
}
/*
 * Name        : numberOfChildren()
 * Parameters  : none
 * Processes   : Extracts the value of the #numChildren input.
 * Return Value: Int: number of tickets to purchase.
 */
function numberOfChildren() {
	var numberOfAdults = Number(document.getElementById("numAdults").value);			// Gets and assigns value of number of children input.
	var numberOfChildren = Number(document.getElementById("numChildren").value);			// Gets and assigns value of number of children input.
	var numChildrenError = document.getElementById("numChildrenError");				// Gets and assigns number of children error element for user feedback.
	var summarynumChildren = document.getElementById("summaryNumChildren");			// Gets and assigns number of children in the summary element.
	try {																			// Attempt logic.
		if (numberOfChildren < 0) 													// Validation for negative values.
			throw "Minimum number of Children is zero. Please correct your input.";
		if (numberOfChildren >2)													// Validation for values greater than occupancy.
			throw "Minimum number of Children should be no more than 2.";
		if (numberOfAdults < 1 && numberOfChildren > 0)
			throw "Children are not allowed to make reservations without an adult.";
		if (numberOfAdults > 0) {													// Validation for positive values.
			if (numberOfChildren >= 0 || numberOfChildren <= 2)
				numChildrenError.style.display = "none";							// Hide error.
				numChildren = numberOfChildren;										// Saves number of adults to a global variable.
				summarynumChildren.innerText = numChildren;					// Populates number of tickets in the summary section.
				summaryArray[1] = numChildren;									// Sets number of adults to populate cost summary.
				updateSummaryHeader();												// Updates the summary header.
				(errors <= 1) ? errors = 0 : --errors;								// If error is greater than 1, decrease errors otherwise reset to zero.
				++formCompletion;													// Increase form completion.
				return numChildren;
		}
	} catch (msg) {
		++errors;																	// Increase erors.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;				// If formCompletion is greater than 1, decrease formCompletion othwerwise reset to zero.
		numChildrenError.style.display = "block";									// Show error.
		numChildrenError.innerHTML = "<p>" + msg + "</p>";							// Write error.
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
	var dateFrom = document.getElementById("dateFrom");								// Gets and stores dateFrom input.
	var dateTo = document.getElementById("dateTo");									// Gets and stores dateTo input.
	var dateFromObject = new Date(dateFrom.value);									// Creates a date object from the dateFrom value.
	var dateToObject = new Date(dateTo.value);										// Creates a date object from the dateTo value.

	if (dateFromObject < currentDate) {												// If selected dateFrom is less than currentDate.
		var stringDateFrom = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate(); 	// Converts current date to usable format by adding a zero for single digit date: i.e. yyyy-mm-d -> yyyy-mm-"0"d.
	}
	if (dateToObject < currentDate) {												// If selected dateFrom is less than currentDate.
		var stringDateTo = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate(); 	// Converts current date to usable format by adding a zero for single digit date: i.e. yyyy-mm-d -> yyyy-mm-"0"d.
	}
}

/*
 * Name        : dateFromHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function dateFromHandler() {
	handlePastDate();						// Ensures that a past date is handled.
	dateInverter();							// Inverts dates if necessary.
	calculateCost();						// Re-calculates the cost.
}

/*
 * Name        : validateDateFrom()
 * Parameters  : none
 * Processes   : Reports errors if departure date is in the past.
 * Return Value: none
 */
function validateDateFrom() {
	var dateFrom = document.getElementById("dateFrom").value;		// Gets and stores value of dateFrom.
	var dateFromError = document.getElementById("dateFromError");	// Gets and stores dateFromError element.
	var dateFromObject = new Date(dateFrom);						// Creates a dateFromObject from dateFrom.
	var summaryDateFrom = document.getElementById("summaryDateFrom");

	try {															// Attempt logic.
		if (currentDate > dateFromObject) {							// If current Date is greater than dateFrom, then.
			throw "The current departure date is not valid. Please select a new departure date";
		} else {
			dateFromError.style.display = "none";					// Remove error notification.
			++formCompletion;										// Increment form completion.
			(errors <= 1) ? errors = 0 : --errors;					// Decrease error ensuring it stays positive.
			summaryDateFrom.innerText = dateFrom;					// Populate new dateFrom in Summary.
			bookable();												// Verify it's bookable.
		}
	} catch (msg) {
		dateFromError.style.display = "block";						// Display error.
		dateFromError.innerHTML = "<p>" + msg + "</p>";				// Write Error.
		++errors;													// Increment error counter.
		(formCompletion <= 1) ? formCompletion = 0 : --formCompletion;	// Decrease formCompletion ensuring it stays positive.
		bookable();													// Verify it's bookable. 
	}
}

/*
 * Name        : returnDateHandler()
 * Parameters  : none
 * Processes   : Populates summary and inverts dates if needed.
 * Return Value: none
 */
function dateToHandler() {
	handlePastDate();							// Verifies if there are past dates.
	dateInverter();								// Inverts past dates if necessary.
	dateToReporter();							//Reports the dateTo to the summary.
	calculateCost();							// Re-calculate the cost.
}

/*
 * Name        : dateToReporter()
 * Parameters  : none
 * Processes   : Reports the dateTo to the summary.
 * Return Value: none
 */
function dateToReporter() {
	var dateTo = document.getElementById("dateTo");					// Get and Store dateTo element.
	var summaryDateTo = document.getElementById("summaryDateTo");	// Get and Store dateTo summary element.
	summaryDateTo.innerText = dateTo.value;							// Write dateTo to summary for user display.
}

/*
 * Name        : dateInverter()
 * Parameters  : none
 * Processes   : Converts user input to date objects for comparison and inverts the dates if needed.
 * Return Value: none
 */
function dateInverter() {
	var dateFrom = document.getElementById("dateFrom");				// Get and store dateFrom element.
	var dateTo = document.getElementById("dateTo");					// Get and store dateTo element.
	var summaryDateFrom = document.getElementById("summaryDateFrom");
	var dateFromObject = new Date(dateFrom.value); 					// Creates a Date element from dateFrom value.
	var dateTo = document.getElementById("dateTo");					// Gets and stores dateTo element.
	var summaryDateTo = document.getElementById("summaryDateTo");	// Gets and stores summary dateTo element.
	var dateToObject = new Date((dateTo).value);					// Creates a Date element from dateTo value.
	var tempDate = new Date();										// Temporary variable for the date swap.
	var dateFromError = document.getElementById("dateFromError");
	if (dateToObject < dateFromObject) {							// If dateTo is before dateFrom.
		tempDate = dateFrom.value;									// Backup dateFrom value.
		dateFrom.value = dateTo.value;								// dateFrom gets dateTo value.
		summaryDateFrom.innerText = dateTo.value;					// Update the summary with new dateFrom.
		dateTo.value = tempDate;									// Assign backed up dateFrom to dateTo thereby swapping.
		summaryDateTo.innerText = tempDate;							// Update the summary with new dateTo.
		window.alert("Please note that the dates selected seem incorrect.\n\nThe dates will be  inverted for your convenience.\n\nPlease review them carefully.");	// Alert the user.
	}
	validateDateFrom();											// Ensures errors are reported if dateFrom is in the past.
}

/*
 * Name        : numberOfNights()
 * Parameters  : none
 * Processes   : Extracts the number of nights in the stay.
 * Return Value: Number of nights in stay.
 */
function numberOfNights() {
	var dateFrom = document.getElementById("dateFrom").value;		// Get and store dateFrom element value.
	var dateFromObject = new Date(dateFrom);						// Create an object from dateFrom element for comparison.
	var dateTo = document.getElementById("dateTo").value;			// Get and store dateTo element value.
	var dateToObject = new Date(dateTo);							// Create an object from dateTo element for comparison.
	var result = (dateToObject - dateFromObject)/(1000*60*60*24);	// Convert millisecond comparison to number of days.
	numNights = result;												// Store result in global vaariable.
	summaryArray[2] = result;										// Store result in summary Array.
	return result;
}

/*
 * Name        : districtNodeCreator()
 * Parameters  : none
 * Processes   : Creates and appends option elements to the options in district selector.
 * Return Value: none
 */
function districtNodeCreator(value, name) {
	var districtSelector = document.getElementById("districtSelector");	// Gets and stores districtSelector.
	var x = document.createElement("OPTION");							// Creates an element.
	x.setAttribute("value", value);										// Sets the element's attributes.
	var y = document.createTextNode(name);								// Creates the node.
	x.appendChild(y);													// Appends the node to the option element.
	districtSelector.appendChild(x);									// Appends the option node to the district selector.
}

/*
 * Name        : roomNodeCreator()
 * Parameters  : none
 * Processes   : Creates and appends option elements to the options in room selector.
 * Return Value: none
 */
function roomNodeCreator(value, name) {
	var roomSelector = document.getElementById("roomSelector");			// Gets and stores roomSelector.
	var x = document.createElement("OPTION");							// Creates an element.
	x.setAttribute("value", value);										// Sets the element's attributes.
	var y = document.createTextNode(name);								// Creates the node.
	x.appendChild(y);													// Apends the node to the option element.
	roomSelector.appendChild(x);										// Appends the option node to the room selector.
}

/*
 * Name        : removeAllNodes()
 * Parameters  : None.
 * Processes   : Removes all options from inputSelector.
 * Return Value: None.
 */
function removeAllNodes(inputSelector)
{
	var i;													// Creates a variable to iterate on.
	for(i= 0; i <= inputSelector.options.length; i++) {		// Iterates over the length of the option in the input selector.
		inputSelector.remove(i);							// Removes all nodes in range.
	}
}
/*
 * Name        : removeNodes()
 * Parameters  : None.
 * Processes   : Removes selected options from inputSelector.
 * Return Value: None.
 */
function removeNodes(inputSelector,a,z)
{
	var i;													// Creates a variable to iterate on.
	for(i= a; i <= z; i++) {									// Iterates over the range of the option in the input selector.
		inputSelector.remove(i);							// Removes all nodes in range.
	}
}
/*
 * Name        : roomRecommendation()
 * Parameters  : None.
 * Processes   : Populates available rooms for stay.
 * Return Value: None.
 */
function optionValidator(){
	var districtSelector = document.getElementById("districtSelector");
	var roomSelector = document.getElementById("roomSelector");
	if (districtSelector.selectedIndex == 0) {							// If district one is selected.
		removeNodes(roomSelector,2,3);
	} else if (districtSelector.selectedIndex == 1) {
		removeNodes(roomSelector,0,1);
	} else {
		removeAllNodes(roomSelector);
	}
}
/*
 * Name        : roomRecommendation()
 * Parameters  : None.
 * Processes   : Populates available rooms for stay.
 * Return Value: None.
 */
function roomRecommendation() {
	var districtSelector = document.getElementById("districtSelector");	// Gets and stores district selector.
	var roomSelector = document.getElementById("roomSelector");			// Gets and stores room selector.
	removeAllNodes(districtSelector);										// Resets nodes in district selector.
	removeAllNodes(roomSelector);											// Resets nodes in room selector.
	
	// Create Nodes For Relevant Occupancy.
	if (party == 1 && numChildren == 0) {
		districtNodeCreator("district1", "District 1");
		roomNodeCreator("room1", "Room Type 1");	
	}

	if (party == 2) {
		districtNodeCreator("district1", "District 1");
		roomNodeCreator("room1", "Room Type 1");
		roomNodeCreator("room2", "Room Type 2");
		districtNodeCreator("district2", "District 2");
		roomNodeCreator("room3", "Room Type 3");
		roomNodeCreator("room4", "Room Type 4");
	}

	if (party == 3) {
		districtNodeCreator("district1", "District 1");
		roomNodeCreator("room2", "Room Type 2");
		districtNodeCreator("district2", "District 2");
		roomNodeCreator("room4", "Room Type 4");
	}

	if (party == 4) {
		districtNodeCreator("district1", "District 1");
		roomNodeCreator("room2", "Room Type 2");
	}

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
	if (summaryArray[2] != null) {
		summary.innerHTML = ("Staying for " + (summaryArray[2] >= 1 ? (summaryArray[2] + " Night") : "0 Nights.</br>Please select your Stay Dates."));
		summary.innerHTML += ((summaryArray[2] > 1 ? "s.</br>" : ".</br>"));
	}
	if (summaryArray[3] != null) {
		summary.innerHTML += ("You'll be staying in " + summaryArray[3] + ", ");
	} else {
		summary.innerHTML += "Please select a district to visit.</br>";
	}
	if (summaryArray[4] != null) {
		summary.innerHTML += ("in " + summaryArray[4] + ".");
	} else {
		summary.innerHTML += "Please select a room for your stay.</br>";
	}
}

/*
 * Name        : calculateCost()
 * Parameters  : .
 * Processes   : Calculates the cost based on the number of travelers.
 * Return Value: None.
 */
function calculateCost() {
	numberOfNights();
	numberOfAdults();
	numberOfChildren();
	party = numAdults + numChildren;
	const ADULTNIGHTLYFEE = 50;								// Defines Adult nightly price constant.
	const CHILDNIGHTLYFEE = 25;								// Defines Adult nightly price constant.
	const TAX = 0.125										// Defines tax constant.
	var tax = 0.0;											// Initializes tax value.
	var subTotal = 0.0;										// Initializes subTotal value.
	var totalCost = 0.0;									// Initializes totalCost value.
	var adultSubTotal = numAdults * ADULTNIGHTLYFEE * numNights;	// Calculates price per adult stay
	var childSubTotal = numChildren * CHILDNIGHTLYFEE * numNights;	//
	subTotal = 	adultSubTotal + childSubTotal;				// Calculates subtotal.
	tax = (subTotal * (TAX));								// Calculate tax value.
	document.getElementById("summaryTax").innerText = "$" + tax.toLocaleString(undefined, {
		maximumFractionDigits: 2							// Localize and write amount of tax in summary with 2 decimal positions.
	});
	totalCost = subTotal + tax;
	document.getElementById("totalCost").innerText = "$" + totalCost.toLocaleString(undefined, {
		maximumFractionDigits: 2							// Localize and write total cost amount in summary with 2 decimal positions.
	});
	roomRecommendation();
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
	if (errors == 0 && formCompletion >=7 ) {							// If there are no errors and form has been completed, then.
		if (document.getElementById("firstName").value != "")			// Double check name is not null.
			if (document.getElementById("lastName").value != "")		// Double check last name is not null.
				if (document.getElementById("email").value != "")		// Double check email is not null.
					if (document.getElementById("dateFrom").value !== "")	// Double check departure date is filled.
						if (document.getElementById("dateTo").value !== "");// Double check tripType is in summary.
							if (document.getElementById("districtSelector").value !== "")
								if (document.getElementById("roomSelector").value !== "")
									purchaseButton.classList.add("enable");		// Enable the purchase tickets button.
							return true;
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
	
	// Event Listener for numberOfAdults().
	var numberOfAdults = document.getElementById("numAdults");
	if (numberOfAdults.addEventListener) {
		numberOfAdults.addEventListener("change", calculateCost, false);
	} else if (numberOfAdults.attachEvent) {
		numberOfAdults.attachEvent("onchange", calculateCost);
	}
	// Event Listener for numberOfChildren().
	var numberOfChildren = document.getElementById("numChildren");
	if (numberOfChildren.addEventListener) {
		numberOfChildren.addEventListener("change", calculateCost, false);
	} else if (numberOfChildren.attachEvent) {
		numberOfChildren.attachEvent("onchange", calculateCost);
	}

	// Event Listener for dateFromHandler().
	var dateFrom = document.getElementById("dateFrom");
	if (dateFrom.addEventListener) {
		dateFrom.addEventListener("change", dateFromHandler, false);
	} else if (dateFrom.attachEvent) {
		dateFrom.attachEvent("onchange", dateFromHandler);
	}

	// Event Listener for dateToHandler().
	var dateTo = document.getElementById("dateTo");
	if (dateTo.addEventListener) {
		dateTo.addEventListener("change", dateToHandler, false);
	} else if (dateTo.attachEvent) {
		dateTo.attachEvent("onchange", dateToHandler);
	}

	// Event Listener for districtSelector().
	var districtSelector = document.getElementById("districtSelector");
	if (districtSelector.addEventListener) {
		districtSelector.addEventListener("change", optionValidator, false);
	} else if (districtSelector.attachEvent) {
		districtSelector.attachEvent("onchange", optionValidator);
	}
	// Event Listener for roomSelector().
	var roomSelector = document.getElementById("roomSelector");
	if (roomSelector.addEventListener) {
		roomSelector.addEventListener("change", optionValidator, false);
	} else if (roomSelector.attachEvent) {
		roomSelector.attachEvent("onchange", optionValidator);
	}
}

// Call createEventListeners on window load.
if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", createEventListeners);
}