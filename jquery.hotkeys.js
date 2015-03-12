!function ($) {

window.HotKeys = {

    pressedKeys: [],
    events: [],
    bodyEventsAdded: false,
    
    keyDownFn: function (e) {

        if (this.pressedKeys.indexOf(e.keyCode) === -1) {
            this.pressedKeys.push(e.keyCode);
        }

        this.checkEvents();
    },

    keyUpFn: function (e) {

        if (this.pressedKeys.indexOf(e.keyCode) !== -1) {
            this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1);
        }
    },

    add: function(keys, fn) {

        if (!this.bodyEventsAdded) {
            this.addBodyEvents();
        }

        var event = {
            keys: keys,
            fn: fn
        };

        this.events.push(event);
    },

    checkEvents: function() {

        for (var i = 0; i < this.events.length; i++) {

            var event = this.events[i],
                eventPass = true;

            for (var i = 0; i < event.keys.length; i++) {
                if (this.pressedKeys.indexOf(event.keys[i]) === -1) {
                    eventPass = false;
                }
            }

            if (eventPass) {
                event.fn();
                this.pressedKeys = [];
            }
        }
    },

    addBodyEvents: function () {

        $(document.body).keydown($.proxy(this.keyDownFn, this));
        $(document.body).keyup($.proxy(this.keyUpFn, this));

        this.bodyEventsAdded = true;
    }
};

}(jQuery);

/** ---------------------------------------------------------------------------
 * Usage
 * ----------------------------------------------------------------------------

    HotKeys.add([18, 67], function() { // ALT and C
        console.log('It Works');
    });

 * ----------------------------------------------------------------------------
 */