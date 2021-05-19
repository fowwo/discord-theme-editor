var active = {};
const maxColors = 14;

/**
 * Sets the active color option of a given property.
 * @param {HTMLDivElement} element - The color option element.
 * @param {String} property - The color property.
 */
function setActiveColorOption(element, property) {
	active[property].classList.remove("active");
	active[property] = element;
	active[property].classList.add("active");
}

/**
 * Changes the currently selected color.
 * @param {String} color - The new color.
 */
function setCurrentColor(color) {
	let property = document.getElementById("selected-color").style.backgroundColor.trim();
	property = property.substring(6, property.length - 1);
	document.documentElement.style.setProperty(`--custom${property.substring(1)}`, color);
	showColorInfo(property);
}

/**
 * Shows the color for a given property on the preview.
 * @param {String} color - The color.
 * @param {String} property - The color property.
 */
function displayColor(color, property) {
	document.documentElement.style.setProperty(`--${property}`, color);
}

/**
 * Shows the color information of the given property.
 * @param {String} property - The color property.
 */
function showColorInfo(property) {
	let selectedColor = document.getElementById("selected-color");
	selectedColor.style.backgroundColor = `var(--${property})`;
	let rgba = getComputedStyle(selectedColor).getPropertyValue("background-color").split("(")[1].split(")")[0].split(",").map((x) => parseFloat(x.trim()));
	document.getElementById("hex-input").value = RGBAToHex(rgba);
	document.getElementById("r-value").innerHTML = rgba[0];
	document.getElementById("g-value").innerHTML = rgba[1];
	document.getElementById("b-value").innerHTML = rgba[2];
	if (rgba.length === 3) rgba[3] = 1;
	document.getElementById("a-value").innerHTML = rgba[3].toFixed(2);
}

/**
 * Converts a hexadecimal representation of a color
 * into an RGBA representation.
 * @param {String} hex - The hexadecimal color.
 */
function hexToRGBA(hex) {
	if (hex.startsWith("#")) hex = hex.substring(1);
	let m = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15 };
	if (hex.length === 3) return [17 * m[hex[0]], 17 * m[hex[1]], 17 * m[hex[2]], 1];
	if (hex.length === 4) return [17 * m[hex[0]], 17 * m[hex[1]], 17 * m[hex[2]], m[hex[3]] / 15];
	if (hex.length === 6) return [16 * m[hex[0]] + m[hex[1]], 16 * m[hex[2]] + m[hex[3]], 16 * m[hex[4]] + m[hex[5]], 1];
	if (hex.length === 8) return [16 * m[hex[0]] + m[hex[1]], 16 * m[hex[2]] + m[hex[3]], 16 * m[hex[4]] + m[hex[5]], (16 * m[hex[6]] + m[hex[7]]) / 255];
}

/**
 * Converts an RGBA representation of a color
 * into an hexadecimal representation.
 * @param {Number[]} rgba - The RGBA color.
 */
function RGBAToHex(rgba) {
	let m = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f' };
	let r = "" + m[Math.floor(rgba[0] / 16)] + m[rgba[0] % 16];
	let g = "" + m[Math.floor(rgba[1] / 16)] + m[rgba[1] % 16];
	let b = "" + m[Math.floor(rgba[2] / 16)] + m[rgba[2] % 16];
	let a = "";
	if (rgba.length === 4) a = "" + m[Math.floor(255 * rgba[3] / 16)] + m[Math.floor(255 * rgba[3] % 16)];
	return `${r}${g}${b}${a}`;
}

/**
 * Checks whether a color is a valid hexadecimal representation.
 * @param {String} hex - The hexadecimal color.
 */
function validHex(hex) {
	if (hex.startsWith("#")) hex = hex.substring(1);
	hex = hex.match(/^[0-9a-fA-F]+$/);
	return hex !== null && (
		hex[0].length === 3 ||
		hex[0].length === 4 ||
		hex[0].length === 6 ||
		hex[0].length === 8
	);
}

/**
 * Restricts input to certain keys that can edit text input.
 * - Backspace
 * - Enter
 * - End
 * - Home
 * - Arrow Keys
 * - Delete
 * @param {Event} event - The key event.
 * @returns {Boolean} True if the key passes the filter.
 */
function inputFilter(event) {
	let key = event.keyCode;
	if (
		key !== 8 && // Backspace
		key !== 13 && // Enter
		key !== 35 && // End
		key !== 36 && // Home
		(key < 37 || key > 40) && // Arrow Keys
		key !== 46 // Delete
	) {
		event.preventDefault();
		return false;
	}
	return true;
}

/**
 * Restricts input to hexadecimal characters.
 * @param {Event} event 
 * @returns {Boolean} True if the key passes the filter.
 */
function hexInputFilter(event) {
	let key = event.keyCode;
	if (
		(key < 48 || key > 57) && // 0 - 9
		(key < 65 || key > 70) && // a - f
		(key < 96 || key > 105) // 0 - 9 (NumPad)
	) return inputFilter(event);
	return true;
}

/**
 * Handles pasting clipboard content into hex input.
 */
function pasteHex() {
	if (!document.getElementById("paste").classList.contains("disabled")) navigator.clipboard.readText().then(hex => {
		if (validHex(hex)) {
			if (hex.startsWith("#")) hex = hex.substring(1);
			setCurrentColor(`#${hex}`);
		} else {
			document.getElementById("paste-icon").animate([{ fill: "#f00" }],{ direction: 'reverse', duration: 500 });
		}
	});
}

/**
 * Handles importing colors from import input.
 */
function importColors() {
	let notice = document.getElementById("invalid-import-notice");
	let list = document.getElementById("import-input").value
		.split(/[^A-z0-9]+/g)
		.filter((x) => { return x !== ""; })
		.map((x) => { return `#${x}`; });
	if (list.length === 0) {
		notice.innerHTML = "Please enter a list of hexadecimal colors.";
		notice.style.display = "initial";
		return;
	}
	let invalid = [];
	let str = "";
	for (var i = 0; i < list.length; i++) {
		let hex = `#${list[i].startsWith("#") ? list[i].substring(1) : list[i]}`;
		if (!validHex(hex)) {
			invalid.push(hex);
		} else {
			str += `    ${hex}\n`;
		}
	}
	if (invalid.length === 0) {
		notice.style.display = "none";
		if (confirm(`You are about to overwrite your custom colors and replace them with the following colors:\n${str}`)) {
			for (var i = 0; i < list.length; i++) {
				document.documentElement.style.setProperty(`--custom${i}`, list[i]);
			}
			for (var i = list.length; i < maxColors; i++) {
				document.documentElement.style.setProperty(`--custom${i}`, "#0000");
			}
			loadTheme("custom");
		}
	} else {
		if (invalid.length === 1) {
			notice.innerHTML = `${invalid[0]} is not a valid hexadecimal color.`;
		} else if (invalid.length === 2) {
			notice.innerHTML = `${invalid[0]} and ${invalid[1]} are not valid hexadecimal colors.`;
		} else {
			let last = invalid.pop();
			notice.innerHTML = `${invalid.join(", ")}, and ${last} are not valid hexadecimal colors.`;
		}
		notice.style.display = "initial";
	}
}
