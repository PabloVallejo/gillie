/**
* Gillie Events
*
* Event tests are based on Backbone.Events tests
* https://github.com/jashkenas/backbone/blob/master/test/events.js
*/

$( document ).ready( function() {


    // Events
    module( 'Gillie.Events' );

    test( 'on and trigger', 2, function() {

        var obj = { count: 0 };
        utils._extend( obj, Gillie.Events );

        obj.on( 'event', function() { obj.count += 1; } );
        obj.trigger( 'event' );

        equal( obj.count, 1, '`count` should be augmented.' );

        obj.trigger( 'event' );                
        obj.trigger( 'event' );                
        obj.trigger( 'event' );

        equal( obj.count, 4, '`count` should be augmented four times.' );

    });


    test( 'Binding and triggering multiple events', 2, function() {

        var obj = { count: 0 };
        utils._extend( obj, Gillie.Events );

        obj.on( 'a b', function() { obj.count += 1; } );

        obj.trigger( 'a' );
        equal( obj.count, 1 );

        obj.trigger( 'a b' );
        equal( obj.count, 3 );

    });    


    test( 'Binding and triggering with event maps', function() {

        var obj = { count: 0 };
        utils._extend( obj, Gillie.Events );

        var increment = function() {
            this.count += 1;
        }

        obj.on({
                a: increment
            ,   b: increment
        }, obj );

        obj.trigger( 'a' );
        equal( obj.count, 1 );

        obj.trigger( 'a b' );
        equal( obj.count, 3 );

    });


});

