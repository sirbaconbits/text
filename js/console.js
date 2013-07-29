/*

## Console.js

Implements a temporary display for testing purposes.

This is probably going to be completely scrapped, just FYI. Don't work on anything too hard.

*/

(function() {

	var Display = new Class({
		Implements: [Options, Events],

		options: {
			readoutLength: 24,
			wizard: false
		},

		initialize: function(element, options) {
			this.element = element;
			this.setOptions(options);

			this.readout = new Element("pre", {
				id: "readout"
			});

			this.indicator = {
				element: new Element("label", {
					"for": "entryLine",
					id: "indicator",
					text: "$",
					events: {
						click: function() {
							this.indicator.mode += 1;
							if (this.indicator.mode > 2) this.indicator.mode = 0;
							this.indicator.element.set("text",
								this.indicator.icon[this.indicator.mode]);
						}.bind(this)
					}
				}),
				draw: function() {
					this.indicator.element.set("text",
						this.indicator.icon[this.indicator.mode]);
				}.bind(this),
				mode: 0,
				icon: [
					"$",
					'"',
					"@"
				]
			};

			this.entryLine = new Element("input", {
				id: "entryLine",
				type: "text",
				events: {
					keypress: function(e) {
						if (e.key == "enter") {
							this.exec(e.target.value);
							e.target.value = "";
						}
					}.bind(this)
				}
			});

			this.element.adopt(
				this.readout,
				this.indicator.element,
				this.entryLine
			);
		},

		log: [],

		exec: function(command) {
			this.fireEvent("command",
				{
					command: command,
					mode: this.indicator.mode
				}
			);
		},

		print: function() {
			Array.each(arguments, function(line) {
				this.log.push(line);
				this.readout.set("text",
					this.log.slice(this.options.readoutLength * -1).join("\n")
				);
			}, this);
		},

		setWizard: function(value) {
			this.options.wizard = value;
			this.indicator.icon[0] =
				this.options.wizard ? "#" : "$";
			this.indicator.draw();
		}
	});

	window.Display = Display;

})();
