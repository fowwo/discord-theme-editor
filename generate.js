var settings = document.getElementById("settings");

function addHeading(text) {
	let heading = document.createElement("h1");
	heading.innerHTML = text;
	settings.appendChild(heading);
}
function addSection(name, property, description = "") {
	let heading = document.createElement("h3");
	heading.innerHTML = name;

	let container = document.createElement("div");
	container.className = "color-option-container";
	container.id = property;

	let defaultOption = createColorOption(property, `var(--default-${property})`);
	defaultOption.classList.add("default", "active");
	defaultOption.onclick = () => {
		let input = document.getElementById("hex-input");
		if (editing) themes.custom[property] = undefined;
		input.disabled = true;
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
			if (editing) {
				themes.custom[property] = index;
				input.disabled = false;
			} else {
				input.disabled = true;
			}
			setActiveColorOption(option, property);
			showColorInfo(`p${index}`);
		};
		container.appendChild(option);
	}

	settings.appendChild(heading);
	addText(description);
	settings.appendChild(container);
}
function addText(text) {
	let p = document.createElement("p");
	p.innerHTML = text;
	settings.appendChild(p);
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
addSection("Floating", "background-floating", "The color of floating elements like tooltips and dropdown menus.");
addSection("Message Hover", "background-message-hover", "The color of the background behind messages when hovering above them.");
addSection("Mentioned", "background-mentioned", "The color of the background behind messages that mention you.<br><span style='color: #fb2a'>* See <b>Info Warning Foreground</b> under <b>Other</b> to change the small bar on the left of messages that mention you.</span>");
addSection("Mentioned Hover", "background-mentioned-hover", "The color of the background behind messages that mention you when hovering above them.");
addSection("Accent", "background-accent", "The accent background color, which is used for things like replies, selecting emojis, and the keys when viewing keybinds.");
hr();
addHeading("Text");
addSection("Normal", "text-normal", "The normal text color, which is used for chat messages and guild icons.");
addSection("Muted", "text-muted", "The muted text color, which is used for chat timestamps, channel icons, and more.");
addSection("Header Primary", "header-primary", "The primary header color, which is used for guild and channel headers and for your username in the user panel.");
addSection("Header Secondary", "header-secondary", "The secondary header color, which is used for channel descriptions.");
addSection("Channels", "channels-default", "The color of channel names as well as the color of status and member group names.");
addSection("Links", "text-link", "The color of hyperlinks.");
addSection("Markdown", "textbox-markdown-syntax", "The color used for markdown syntax, like the asterisks in *italics* and **bold**.");
hr();
addHeading("Interactive");
addSection("Normal", "interactive-normal", "The normal interactive color, which is used for button icons.");
addSection("Hover", "interactive-hover", "The hover interactive color is shown when hovering over interactive elements like buttons and channels.");
addSection("Active", "interactive-active", "The active interactive color, which is used for toggled buttons and and the current channel.");
addSection("Muted", "interactive-muted", "The active interactive color, which is used for muted channels and user embeds.");
addSection("Background Hover", "background-modifier-hover", "The background color when hovering over interactive elements.");
addSection("Background Active", "background-modifier-active", "The background color for active interactive elements like when holding down the mouse on channels in the channel list.");
addSection("Background Selected", "background-modifier-selected", "The background color for selected interactive elements like channels in the channel list.");
addSection("Background Accent", "background-modifier-accent", "The color of lines used to divide regions, such as the line marking a new day in text channels.");
hr();
addHeading("Scrollbar");
addSection("Thumb", "scrollbar-auto-thumb", "The thumb color of the chat scrollbar.");
addSection("Track", "scrollbar-auto-track", "The track color of the chat scrollbar.");
addSection("Thin Thumb", "scrollbar-thin-thumb", "The thumb color of the thin scrollbar, which is seen when hovering over the channel and member lists.");
addSection("Thin Track", "scrollbar-thin-track", "The track color of the thin scrollbar, which is seen when hovering over the channel and member lists.");
hr();
addHeading("Other");
addSection("Focus", "focus-primary", "The color of the outline when focusing on elements (using Tab).");
addSection("Radio Button", "control-brand-foreground", "The color of active radio buttons.");
addSection("Info Warning Foreground", "info-warning-foreground", "The foreground color of warning info boxes, but also the color of the small bar on the left of messages that mention you.");
hr();
addHeading("Extra");
addText("The following colors are either not important to change or I do not know where they are being used.");
addSection("scrollbar-auto-scrollbar-color-thumb", "scrollbar-auto-scrollbar-color-thumb", "");
addSection("scrollbar-auto-scrollbar-color-track", "scrollbar-auto-scrollbar-color-track", "");

addSection("background-mobile-primary", "background-mobile-primary", "");
addSection("background-mobile-secondary", "background-mobile-secondary", "");

// addSection("elevation-stroke", "elevation-stroke", "");
// addSection("elevation-low", "elevation-low", "The default color for this property uses multiple colors, so the displayed information is incorrect.");
// addSection("elevation-medium", "elevation-medium", "");
// addSection("elevation-high", "elevation-high", "");

addSection("logo-primary", "logo-primary", "");
// addSection("guild-header-text-shadow", "guild-header-text-shadow", "");
addSection("activity-card-background", "activity-card-background", "");

addSection("text-warning", "text-warning", "");
addSection("text-danger", "text-danger", "");
addSection("info-positive-background", "info-positive-background", "");
addSection("info-positive-foreground", "info-positive-foreground", "");
addSection("info-warning-background", "info-warning-background", "");
addSection("info-danger-background", "info-danger-background", "");
addSection("info-danger-foreground", "info-danger-foreground", "");
addSection("status-positive-background", "status-positive-background", "");
addSection("status-positive-text", "status-positive-text", "");
addSection("status-warning-background", "status-warning-background", "");
addSection("status-danger-background", "status-danger-background", "");
addSection("status-danger-text", "status-danger-text", "");
addSection("text-positive", "text-positive", "");
addSection("info-positive-text", "info-positive-text", "");
addSection("info-warning-text", "info-warning-text", "");
addSection("info-danger-text", "info-danger-text", "");
addSection("info-help-background", "info-help-background", "");
addSection("info-help-foreground", "info-help-foreground", "");
addSection("info-help-text", "info-help-text", "");
addSection("status-warning-text", "status-warning-text", "");
addSection("deprecated-card-bg", "deprecated-card-bg", "");
addSection("deprecated-card-editable-bg", "deprecated-card-editable-bg", "");
addSection("deprecated-store-bg", "deprecated-store-bg", "");
addSection("deprecated-quickswitcher-input-background", "deprecated-quickswitcher-input-background", "");
addSection("deprecated-quickswitcher-input-placeholder", "deprecated-quickswitcher-input-placeholder", "");
addSection("deprecated-text-input-bg", "deprecated-text-input-bg", "");
addSection("deprecated-text-input-border", "deprecated-text-input-border", "");
addSection("deprecated-text-input-border-hover", "deprecated-text-input-border-hover", "");
addSection("deprecated-text-input-border-disabled", "deprecated-text-input-border-disabled", "");
addSection("deprecated-text-input-prefix", "deprecated-text-input-prefix", "");
