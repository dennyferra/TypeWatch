/*
*	TypeWatch 2.0 - Original by Denny Ferrassoli / Refactored by Charles Christolini
*
*	Examples/Docs: github.com/dennyferra/TypeWatch
*	
*  Copyright(c) 2007 Denny Ferrassoli - DennyDotNet.com
*  Coprright(c) 2008 Charles Christolini - BinaryPie.com
*  
*  Dual licensed under the MIT and GPL licenses:
*  http://www.opensource.org/licenses/mit-license.php
*  http://www.gnu.org/licenses/gpl.html
*/

(function(jQuery) {
	jQuery.fn.typeWatch = function(o) {
		// Options
		var options = jQuery.extend({
			wait: 750,
			callback: function() { },
			highlight: true,
			captureLength: 2
		}, o);

		function checkElement(timer, override) {
			var elTxt = jQuery(timer.el).val();

			// Fire if text >= options.captureLength AND text != saved txt OR if override AND text >= options.captureLength
			if ((elTxt.length >= options.captureLength && elTxt.toUpperCase() != timer.text)
			|| (override && elTxt.length >= options.captureLength)) {
				timer.text = elTxt.toUpperCase();
				timer.cb(elTxt, timer.el);
			}
		};

		function watchElement(elem) {
			// Must be text or textarea
			if (elem.type.toUpperCase() == "TEXT" || elem.type.toUpperCase() == "PASSWORD" || elem.nodeName.toUpperCase() == "TEXTAREA") {

				// Allocate timer element
				var timer = {
					timer: null,
					text: jQuery(elem).val().toUpperCase(),
					cb: options.callback,
					el: elem,
					wait: options.wait
				};

				// Set focus action (highlight)
				if (options.highlight) {
					jQuery(elem).focus(
						function() {
							this.select();
						});
				}

				// Key watcher / clear and reset the timer
				var startWatch = function(evt) {
					var timerWait = timer.wait;
					var overrideBool = false;

					if (evt.keyCode == 13 && (this.type.toUpperCase() == "TEXT" || this.type.toUpperCase() == "PASSWORD")) {
						timerWait = 1;
						overrideBool = true;
					}

					var timerCallbackFx = function() {
						checkElement(timer, overrideBool)
					}

					// Clear timer					
					clearTimeout(timer.timer);
					timer.timer = setTimeout(timerCallbackFx, timerWait);
				};

				jQuery(elem).keydown(startWatch);
			}
		};

		// Watch Each Element
		return this.each(function(index) {
			watchElement(this);
		});

	};
})(jQuery);
