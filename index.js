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
