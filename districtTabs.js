//	* File Name   : tabs.js
//	* Name        : Team 1
//	* Course      : 202010-COP-2830C-15165 Valencia College
//	* Facilitator : David Stendel
//	* Description : HTML Provided by Cengeage
//	* Team Members: Alvaro Bolanos, Ashley McCray, Raymond Ynoa.
//	* Date        : 2019/12/1

// Interpret Documents In Javascript Strict Mode.
"use strict";

// Global Variables


// Functions

/*
 * Name        : selectTab()
 * Parameters  : none.
 * Processes   : Makes one of the tabs visible.
 * Return Value: none.
 */
function selectTab(evt, selectedTab) {
	var i, tabContent, tabLink;
	tabContent = document.getElementsByClassName("tabContent");
	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = "none";
	}
	tabLink = document.getElementsByClassName("tabLink");
	for (i = 0; i < tabLink.length; i++) {
		tabLink[i].className = tabLink[i].className.replace("active", "");
	}
	document.getElementById(selectedTab).style.display = "block";
	evt.currentTarget.className += " active";
}

/*
 * Name        : districtsTab()
 * Parameters  : None.
 * Processes   : Selects the first tab in the districts page.
 * Return Value: None.
 */
function districtsTab() {
	selectTab(0, 'districtOne');
}

// Call districtsTab on window load.
if (window.addEventListener) {
	window.addEventListener("load", districtsTab, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", districtsTab);
}