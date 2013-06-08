/**
* Gillie 0.1
* Micro Framework
*
* MIT Licenced.
* (c) 2013, Pablo Vallejo - http://PabloVallejo.github.io/gillie
*
* Inspired by Simple JavaScript Inheritance by John Resig, Backbone, jQuery and Underscore.
*/

( function( window, $ ) {

    // Taken from Backbone.
    // Cached regex to split keys for `delegate`.
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    var initializing = false
    ,   fnTest = /xyz/.test( function(){ xyz; }) ? /\b_super\b/ : /.*/

        // Backbone's regex to split keys for `delegate` method.
    ,   delegateEventSplitter = /^(\S+)\s*(.*)$/;



    // The base class implementation
    this.Gillie = function() {

        // Create a function that bound to a given object.
        // Adapted from underscore `_.bind`
        this.bind = function( func, context ) {
            return function() {
                return func.apply( context, arguments );
            };
        };

        // Delegate events
        this.delegateEvents = function( events ) {

            if ( ! ( events || ( events = this.events ) ) ) return this;

            for( var key in events ) {
                var method = events[ key ];

                method = this[ events[ key ] ];
                if ( ! method ) continue;

                var match = key.match( delegateEventSplitter );
                var eventName = match[ 1 ], selector = match[ 2 ]

                // Element to bind events to. Take document as fallback
                ,   el = this.el || document;

                // Method
                method = this.bind( method, this );

                if ( selector === '' ) {
                    $( el ).on( eventName, method );
                } else {
                    $( el ).on( eventName, selector, method );
                }
            }

            return this;
       }

    };

    // New class that inherits from this class
    Gillie.extend = function( prop ) {

        var _super = this.prototype;

        // Instantiate a base class
        initializing = true;
        var prototype = new this();
        initializing = false;


        // Copy the properties over onto the new prototype
        for ( var name in prop ) {

            // Check whether we're overwriting an existing function
            prototype[ name ] = typeof prop[ name ] == "function" &&
                typeof _super[ name ] == "function" && fnTest.test( prop[ name ] ) ?
                ( function( name, fn ) {
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same
                        // methods but on the super-class
                        this._super = _super[ name ];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply( this, arguments );
                        this._super = tmp;

                        return ret;
                    };
                })( name, prop[ name ] ) :
                prop[ name ];
        }

        // Class constructor
        function Gillie() {

            // All construction is actually done in the initialize method
            if ( ! initializing ) {

                if ( this.initialize ) this.initialize.apply( this, arguments );
                this.delegateEvents();
            }

        }

        // Populate our constructed prototype object
        Gillie.prototype = prototype;

        // Enforce the constructor to be what we expect
        Gillie.prototype.constructor = Gillie;

        // Make this class expendable
        Gillie.extend = arguments.callee;

        return Gillie;
    };

    // Expose Gillie to the global scope
    window.Gillie = this.Gillie;

})( this, this.jQuery );
