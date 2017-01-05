# The official home for the TypeWatch jQuery plugin. #

[![CDNJS](https://img.shields.io/cdnjs/v/TypeWatch.svg)](https://cdnjs.com/libraries/TypeWatch)

TypeWatch calls a function when a user has typed text in an input, textarea and changes in div from editors (including HTML 5 input types) and after the user has stopped typing for a specified amount of time.

> Note* This is not the OnChange event, instead the function is called after the user has finished typing (or if the user stopped typing for # amount of milliseconds) even if the input continues to have focus.

This can be used in conjunction with an AutoComplete implementation, so instead of firing an AJAX call every 500 ms, you can fire it once when they’ve stopped typing.

> Now supports HTML 5 oninput event for browsers that support it

Example:

```javascript
// callback: The callback function
// wait: The number of milliseconds to wait after the the last key press before firing the callback
// highlight: Highlights the element when it receives focus
// allowSubmit: Allows a non-multiline element to be submitted (enter key) regardless of captureLength
// captureLength: Minimum # of characters necessary to fire the callback

var options = {
    callback: function (value) { console.log('TypeWatch callback: (' + (this.type || this.nodeName) + ') ' + value); },
    wait: 750,
    highlight: true,
    allowSubmit: false,
    captureLength: 2
}

$("#search").typeWatch( options );
```

+ When working with any element other than __TEXTAREA__ pressing the __ENTER__ key will fire the callback function.
+ When working with any editor which supports __DIV__ it works like a textarea.
+ The cut and paste events are also included.

Works with multiple elements:

```javascript
$(".textbox,input,textarea,#search").typeWatch( options );
```

Lastly, if you use or enjoy TypeWatch beer donations are always appreciated

[Donate a beer, half a beer, or a 6-pack](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=95YL35K45G4VA&lc=US&item_name=Denny+Ferrassoli&currency_code=USD&bn=PP-DonationsBF%3Abtn_donate_SM.gif%3ANonHosted)
