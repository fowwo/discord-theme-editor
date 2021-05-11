var active = {};

/**
 * Sets the active color of a given property.
 * @param {HTMLDivElement} element - The color option element.
 * @param {String} property - The color property.
 */
function setActiveColor(element, property) {
	active[property].classList.remove("active");
	active[property] = element;
	active[property].classList.add("active");
}

/**
 * Shows the color for a given property on the preview.
 * @param {String} color - The color.
 * @param {String} property - The color property.
 */
function displayColor(color, property) {
	document.documentElement.style.setProperty(`--${property}`, color);
}
