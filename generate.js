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

	let defaultOption = createColorOption(property, `var(--default-${property})`);
	defaultOption.classList.add("default", "active");
	defaultOption.onclick = () => {
		let input = document.getElementById("hex-input");
		input.disabled = true;
		input.classList.add("disabled");
		setActiveColorOption(defaultOption, property);
		showColorInfo(`default-${property}`);
	};
	active[property] = defaultOption;
	container.appendChild(defaultOption);
	for (var i = 0; i < 14; i++) {
		let index = i;
		let option = createColorOption(property, `var(--p${i})`);
		option.onclick = () => {
			let input = document.getElementById("hex-input");
			input.disabled = false;
			input.classList.remove("disabled");
			setActiveColorOption(option, property);
			showColorInfo(`custom${index}`);
		};
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
	option.onmouseover = () => { displayColor(option.style.backgroundColor, property); };
	option.onmouseout = () => { displayColor(active[property].style.backgroundColor, property); }
	return option;
}
function hr() {
	settings.appendChild(document.createElement("hr"));
}

addHeading("Background");
addSection("Primary", "background-primary", "The primary background color, which is used behind chat messages and guild icons.");
addSection("Secondary", "background-secondary", "The secondary background color, which is used behind the channel and member lists.");
addSection("Secondary Alt", "background-secondary-alt", "The alternate secondary background color, which is used behind your user information.");
addSection("Tertiary", "background-tertiary", "The tertiary background color, which is used for the search bar and used along the outside of the window.");
addSection("Chat Input", "channeltextarea-background", "The color of the chat input box.");
