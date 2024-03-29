"use strict";

window.onload = function () {
	var seedTime = NaN;
	var timeCache = 0;
	var time;
	var timer = undefined;

	//Start button event listener
	document.getElementById("start").onclick = function () {
		seedTime = Date.now();
		if (timer !== undefined) {
			clearInterval(timer);
		}

		timer = setInterval(function () {
			time = format(Date.now() - seedTime + timeCache);
			document.getElementById("output").value = time;
		}, 100);
	};

	document.getElementById("stop").onclick = function () {
		clearInterval(timer);
		timeCache += Date.now() - seedTime;
	};

	document.getElementById("lap").onclick = function () {
		var lapRecord = document.getElementById("record");
		var li = document.createElement("li");

		lapRecord.appendChild(li);
	};

	document.getElementById("reset").onclick = function () {
		seedTime = NaN;
		clearInterval(timer);
		timeCache = 0;
		document.getElementById("output").value = "00:00:00.00";
		document.getElementById("record").innerHTML = "";
	};
};

/**
 * Formats the time to HH:MM:SS.MS
 * @param  {in} milliseconds	-> Time in milliseconds
 * @return {int} time			=> Time formated
 */
function format(milliseconds) {
	var hours = Math.floor(milliseconds / 3600000);
	var minutes = Math.floor(milliseconds % 3600000 / 60000);
	var seconds = milliseconds % 60000 / 1000;
	var result = "";

	switch (hours.toString().length) {
		case 0:
			result + "00:";
			break;

		case 1:
			result += "0" + hours + ":";
			break;

		default:
			result += hours + ":";
	}

	switch (minutes.toString().length) {
		case 0:
			result += "00:";
			break;

		case 1:
			result += "0" + minutes + ":";
			break;

		default:
			result += minutes + ":";
	}

	seconds = seconds.toString();

	if (seconds[0] == ".") result += "00" + seconds.substring(0, 2);else if (seconds[1] == ".") result += "0" + seconds.substring(0, 3);else if (seconds[2] == ".") result += seconds.substring(0, 4);

	if (seconds[4] == undefined) result += "0";

	return result;
}