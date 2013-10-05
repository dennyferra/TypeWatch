/*
*	TypeWatch 3
*
*	Examples/Docs: github.com/dennyferra/TypeWatch
*	
*  Copyright(c) 2013 
*	Denny Ferrassoli - dennyferra.com
*   Charles Christolini
*   Ray Ch - iraycd.com
*   Ninjaas - ninjaas.com
*  
*  Dual licensed under the MIT and GPL licenses:
*  http://www.opensource.org/licenses/mit-license.php
*  http://www.gnu.org/licenses/gpl.html
*/

(function(jQuery) {
	jQuery.fn.typeWatch = function(o) {
		// The default input types that are supported
		var _supportedInputTypes =
			['TEXT', 'TEXTAREA', 'PASSWORD', 'TEL', 'SEARCH', 'URL', 'EMAIL', 'DATETIME', 'DATE', 'MONTH', 'WEEK', 'TIME', 'DATETIME-LOCAL', 'NUMBER', 'RANGE'];

		// Options
		var options = jQuery.extend({
			wait: 750,
			callback: function() { },
			highlight: true,
			captureLength: 2,
			inputTypes: _supportedInputTypes
		}, o);

		function checkElement(timer, override) {
			var value = jQuery(timer.el).val();

			// Fire if text >= options.captureLength AND text != saved text OR if override AND text >= options.captureLength
			if ((value.length >= options.captureLength && value.toUpperCase() != timer.text)
				|| (override && value.length >= options.captureLength))
			{
				timer.text = value.toUpperCase();
				timer.cb.call(timer.el, value);
			}
		};

		function checkDivElement(timer, override) {
			var value = jQuery(timer.el).html();

			// Fire if text >= options.captureLength AND text != saved text OR if override AND text >= options.captureLength
			if ((value.length >= options.captureLength && value.toUpperCase() != timer.text)
				|| (override && value.length >= options.captureLength))
			{
				timer.text = value.toUpperCase();
				timer.cb.call(timer.el, value);
			}
		};



		function watchElement(elem) {
			if(elem.type){ 
				var elementType = elem.type.toUpperCase();
				if (jQuery.inArray(elementType, options.inputTypes) >= 0) {

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
						var evtElementType = this.type.toUpperCase();

						// If enter key is pressed and not a TEXTAREA and matched inputTypes
						if (typeof evt.keyCode != 'undefined' && evt.keyCode == 13 && evtElementType != 'TEXTAREA' && jQuery.inArray(evtElementType, options.inputTypes) >= 0) {
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

					jQuery(elem).on('keydown paste cut input', startWatch);
				}
			}else{
					// Allocate timer element
					var timer = {
						timer: null,
						text: jQuery(elem).html().toUpperCase(),
						cb: options.callback,
						el: elem,
						wait: options.wait
					};

					var startWatch = function(evt) {
						var timerWait = timer.wait;
						var overrideBool = false;

						var timerCallbackFx = function() {
							checkDivElement(timer, overrideBool)
						}

						// Clear timer					
						clearTimeout(timer.timer);
						timer.timer = setTimeout(timerCallbackFx, timerWait);
					};
					jQuery(elem).on('keydown paste cut input', startWatch);

			}
			
		};

		// Watch Each Element
		return this.each(function() {
			watchElement(this);
		});

	};
})(jQuery);