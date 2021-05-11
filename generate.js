var settings = document.getElementById("settings");

function addHeading(text) {
	let heading = document.createElement("h1");
	heading.innerHTML = text;
	settings.appendChild(heading);
}
function addSection(name, property, description = "") {
	let heading = document.createElement("h3");
	let p = document.createElement("p");
	heading.innerHTML = name;
	p.innerHTML = description;

	let container = document.createElement("div");
	container.className = "color-option-container";

	let defaultOption = createColorOption(property, `var(--${property})`);
	defaultOption.classList.add("default", "active");
	active[property] = defaultOption;
	container.appendChild(defaultOption);
	for (var i = 0; i < 10; i++) {
		let option = createColorOption(property, `var(--p${i})`);
		container.appendChild(option);
	}

	settings.appendChild(heading);
	settings.appendChild(p);
	settings.appendChild(container);
}
function createColorOption(property, color) {
	let option = document.createElement("div");
	option.innerHTML = "✓";
	option.className = "color-option";
	option.style.backgroundColor = color;
	option.onclick = (event) => { setActiveColor(event.target, property); };
	return option;
}
function hr() {
	settings.appendChild(document.createElement("hr"));
}
