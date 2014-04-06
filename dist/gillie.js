/**
* Gillie 0.2.0
* JavaScript MVC Micro Framework
*
* MIT Licensed.
* (c) 2014, Pablo Vallejo - https://PabloVallejo.github.io/gillie
*
* Based on Simple JavaScript Inheritance by John Resig, Backbone, jQuery and Underscore.
*/
( function( $, window ) {

    var

        // Gillie version
        version = '0.2.0'

    ,   initializing = false
    ,   fnTest = /xyz/.test( function(){ xyz; }) ? /\b_super\b/ : /.*/

        // Base class implementation
    ,   Gillie = function() { }

        // Extend a given object with all the properties in passed-in object(s)
        // Adapted from underscore `extend`
        // https://github.com/jashkenas/underscore/blob/master/underscore.js#L786
    ,   _extend = function( obj ) {

            $.each( [].slice.call( arguments, 1 ), function( key, source ) {

                if ( source ) {
                    for ( var prop in source ) {
                        obj[ prop ] = source[ prop ];
                    }
                }
            });

            return obj;
        };


    // Gillie.Events,
    // Events API which can be used for triggering `trigger` and
    // listening `on` to events.
    // Adapted from `Backbone.Events`
    // https://github.com/jashkenas/backbone/blob/master/backbone.js#L69
    var Events = Gillie.Events = {

            // Bind to events.
            on: function( name, callback, context ) {

                if ( ! eventsApi( this, 'on', name, [ callback, context ] ) || ! callback ) return this;
                this._events || ( this._events = {} );

                var events = this._events[ name ] || ( this._events[ name ] = [] );
                events.push({ callback: callback, context: context, ctx: context || this });
                return this;
            }

            // Trigger the callbacks for the event or events that have been bound.
        ,   trigger: function( name ) {

                if ( ! this._events ) return this;
                var args = [].slice.call( arguments, 1 );
                if ( ! eventsApi( this, 'trigger', name, args ) ) return this;

                var events = this._events[ name ];
                if ( events ) triggerEvents( events, args );
                return this;
            }

    };

    // Regex to split words.
    var  eventSplitter = /\s+/

        // API for events.
    ,   eventsApi = function( obj, action, name, rest ) {

            if ( ! name ) return;

            // Handle event maps.
            //
            //   { evt1: handle, evt2: handle2 }
            //
            if ( typeof name === 'object' ) {
                for ( var key in name ) {
                    obj[ action ].apply( obj, [ key, name[key] ].concat( rest ) );
                }
                return false;
            }


            // Handle space separated event names 'event1 event2 ...'.
            if ( eventSplitter.test( name ) ) {
                var names = name.split( eventSplitter );

                for ( var i = 0, l = names.length; i < l; i++ ) {
                    obj[ action ].apply( obj, [ names[i] ].concat( rest ) );
                }
                return false;
            }

            return true;
        }

        // Trigger events
    ,   triggerEvents = function( events, args ) {

            var ev, i = -1, l = events.length, a1 = args[ 0 ], a2 = args[ 1 ], a3 = args[ 2 ];

            switch( args.length ) {

                case 0: while( ++i < l ) ( ev = events[ i ] ).callback.call( ev.ctx ); return;
                case 1: while( ++i < l ) ( ev = events[ i ] ).callback.call( ev.ctx, a1 ); return;
                case 2: while( ++i < l ) ( ev = events[ i ] ).callback.call( ev.ctx, a1, a2 ); return;
                case 3: while( ++i < l ) ( ev = events[ i ] ).callback.call( ev.ctx, a1, a2, a3 ); return;
                default: while( ++i < l ) ( ev = events[ i ] ).callback.apply( ev.ctx, args );
            }

        };

    var listenMethods = { on: 'listenTo' };

    // Inversion-of-control versions of `on` and `once`. Tell *this* object to
    // listen to an event in another object ... keeping track of what it's
    // listening to.
    $.each( listenMethods, function( implementation, method ) {

        Events[ method ] = function( obj, name, callback ) {

            var listeners = this._listeners || ( this._listeners = {} )
            ,   id = obj._listenerId || ( obj._listenerId = uniqueId( 'l' ) );

            listeners[ id ] = obj;
            if ( typeof name === 'object' ) callback = this;
            obj[ implementation ]( name, callback, this );

            return this;
        };

    });


    // Gillie.Handler
    // Handlers are used to listen for DOM events, get data from them
    // and then route that data to a controller, view or model.
    var Handler = Gillie.Handler = function( options ) {

            if ( this.initialize ) this.initialize.apply( this, arguments );
            this.delegateEvents();
        }

        // Regex to split keys for `delegate` method.
    ,   delegateEventSplitter = /^(\S+)\s*(.*)$/;


    _extend( Handler.prototype, Events, {

            // Create a function that bound to a given object.
            // Adapted from underscore `_.bind()`.
            // https://github.com/jashkenas/underscore/blob/master/underscore.js#L583
            bind: function( func, context ) {
                return function() {
                    return func.apply( context, arguments );
                }
            }

            // Delegate the events passed from the `events` object.
            // https://github.com/jashkenas/backbone/blob/master/backbone.js#L1048
        ,   delegateEvents: function( events ) {

                if ( ! ( events || ( events = this.events ) ) ) return this;

                for( var key in events ) {
                    var method = events[ key ];

                    method = this[ events[ key ] ];
                    if ( ! method ) continue;

                    var match = key.match( delegateEventSplitter );
                    var eventName = match[ 1 ], selector = match[ 2 ]

                    // Element to bind events to. Take document as fallback.
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

    });


    // Gillie.Model
    // Models take care of talking to the server by making AJAX requests
    // and then triggering events so that views that are listening to them
    // can do actions with the returned data.
    var Model = Gillie.Model = function( attributes ) {
        var defaults;
        var attrs = attributes || {};
        this.cid = uniqueId( 'c' );
        this.attributes = {};
        if ( defaults = this.defaults ) {
            attrs = $.extend( {}, defaults, attrs );
        }

        // Set new attributes
        //
        //      this.set( attrs );
        //
        this.attributes = attrs;
        if ( this.initialize ) this.initialize();

    }

    // Cached regular expressions for matching named param parts and splatted
    // parts of route strings.
    // Adapted from https://github.com/jashkenas/backbone/blob/master/backbone.js#L1219
    ,   namedParam    = /(\(\?)?:\w+/g

    // Cached regexp for removing a trailing slash.
    ,   trailingSlash = /\/$/;


    _extend( Model.prototype, Events, {


            // Set one attribute or several attributes, on the model.
            //
            //      // Setting attributes in a model instance.
            //      model.set({ foo: 1, bar: 2 });
            //
            set: function( key, val, options ) {
                var attr,  attrs, current, unset;

                if ( key == null ) return this;

                // As Backbone's "set", handle both `"key"`, value
                // and `{ key: value }` - style arguments.
                if ( typeof key === 'object' ) {
                    attrs = key;
                    options = val;

                } else {
                    ( attrs = {} )[ key ] = val;
                }

                options || ( options = {} );

                // Get options
                unset = options.unset;

                // Store current attributes.
                current = this.attributes;

                // Set every attribute that was passed.
                for ( attr in attrs ) {
                    val = attrs[ attr ];

                    // Always update the attribute.
                    unset ? delete current[ attr ] : current[ attr ] = val;
                }

                return this;

            }

            // Backbone's "get", which get the value of an attribute.
        ,   get: function( attr ) {
                return this.attributes[ attr ];
            }

            // Remove an attribute from the model.
        ,   unset: function( attr, options ) {
                return this.set( attr, void 0, _extend( {}, options, { unset: true } ) );
            }

            // Return a copy of the model's "attributes" object
        ,   toJSON: function() {
                return $.extend( {}, this.attributes );
            }

            // Parse a router string setting the respective values of named
            // variables based on model attributes.
            //
            //      var route = this.buildRequestUrl( 'user/:id/statuses/:page' );
            //
        ,   buildRequestUrl: function( route ) {

                var varName, modelVar, _this = this
                ,   route;

                route = route.replace( namedParam, function( match, optional ) {

                    // Loop through each name variable getting value from model
                    varName = match.replace( ':', '' );
                    modelVar = _this.get( varName );

                    return optional ? match : modelVar || match;
                });

                // Use `route` as full URL if its contains
                // `http:|https:`.
                return (/^(\/\/|http:|https:).*/.test( route )) ?
                   route : ( this.url ? this.url + route :
                       window.location.href + '/' + route );

            }

            // Proxy to `Gillie.sync` by default
        ,   sync: function() {
                return Gillie.sync.apply( this, arguments );
            }

    });

    // Request wrappers that will be implements on model
    var methodsAlias = [
                [ 'Get', 'read' ], [ 'Post', 'create' ]
            ,   [ 'Put', 'update' ], [ 'Delete', 'delete' ]
            ,   [ 'Patch', 'patch' ]
        ]
    ,   requestMethods = {};

    // Create each method in the `requestMethods` object so that we can
    // extend the model with it.
    $.each( methodsAlias , function( k, v ) {

        // Request methods
        //
        //      // Make a post request to the specified path with named
        //      // variables, in this case `:query` and `:page` which match model attributes.
        //
        //      // Note that each request takes `model.url` as the base for the AJAX URL
        //      // and when it isn't present, uses `window.location.href` as base URL.
        //      model._post( 'search/:query/:page', 'custom_event', options );
        //
        requestMethods[ v[ 0 ] ] = function( path, event, options ) {

                options = options ? options : {};
                var xhr, model = this
                ,   success = options.success;

                // Default success function
                options.success = function( resp ) {

                    // Call passed "success" function if specified.
                    if ( success ) success( model, resp, options );
                    model.trigger( event, model, resp, options );
                }

                // Add path to the base URL.
                options.url = this.buildRequestUrl( path );

                xhr = this.sync( v[ 1 ], this, options );
                return xhr;

            }
    });

    // Add request methods to model
    _extend( Model.prototype, requestMethods );


    // Gillie.View
    // In Gillie, views are taken care of affecting DOM elements,
    // that means, they subscribe to models events, when these events
    // are triggered, views print the new data, of show feedback, etc.
    var View = Gillie.View = function( options ) {

        if ( this.initialize ) this.initialize();
    }

    _extend( View.prototype, Events );


    // Gillie.sync
    //
    Gillie.sync = function( method, model, options ) {

        var type = methodMap[ method ];

        // Default JSON-request options
        var params = { type: type, dataType: 'json' };

        // Make sure we have an URL.
        if ( ! options.url ) {
            params.url = model.url;
        }

        // Ensure that we have the appropriate data
        if ( options.data == null && model && ( method === 'create' || method === 'update' || method === 'patch' ) ) {
            params.contentType = 'application/json';
            params.data = JSON.stringify( options.attrs || model.toJSON() );
        }

        // Don't process data on a non-GET request.
        if ( params.type !== 'GET' ) {
            params.processData = false;
        }

        // If we're sending a `PATCH` request and we're in an old Internet Explorer browser
        // that still has ActiveX enabled by default, override jQuery or Zepto to use that
        // for XHR instead.
        if ( params.type === 'PATCH' && noXhrPatch ) {
            params.xhr = function() {
                return new ActiveXObject( "Microsoft.XMLHTTP" );
            }
        }

        // Make the request, allowing the user to override any AJAX options.
        var xhr = options.xhr = Gillie.ajax( $.extend( params, options ) );
        model.trigger( 'request', model, xhr, options );
        return xhr;

    }

    var noXhrPatch = typeof window !== 'undefined' && !! window.ActiveXObject && !( window.XMLHttpRequest && ( new XMLHttpRequest ).dispatchEvent )

    // Map from CRUD to HTTP for our default `Gillie.Model.sync` implementation
    ,   methodMap = {
            'create': 'POST'
        ,   'update': 'PUT'
        ,   'patch': 'PATCH'
        ,   'delete': 'DELETE'
        ,   'read': 'GET'
    };

    // Set the default implementation of `Gillie.ajax` to proxy through to `$`.
    Gillie.ajax = function() {
        return $.ajax.apply( $, arguments );
    };

    // Helpers
    var extend = function( prop ) {

        var _super = this.prototype, parent = this;

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

            if ( ! initializing ) {
                parent.apply( this, arguments );
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

    // Generate a unique integer id ( unique within the entire client session ).
    // Useful for temporary DOM ids
    var idCounter = 0

    ,   uniqueId = function( prefix ) {
            var id = ++ idCounter + '';
            return prefix ? prefix + id : id;
        };



    // Make Handler, Model, View and Controller be extensible
    Gillie.Handler.extend = Gillie.Model.extend = Gillie.View.extend = extend;


    // Expose Gillie to the global scope
    window.Gillie = Gillie;

})( jQuery, this );
