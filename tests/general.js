
/**
* General Guillie tests
*/

$( document ).ready( function() {


    // Basics
    test( "Initialize + Events", 5, function() {

        // Dummy element
        var dummyEl = $( '<a class="dummy" href="#"></a>' );
        dummyEl.appendTo( "body" );

        // Main class
        var Person = Gillie.extend({

                // Init
                initialize: function() {

                    ok( true, "Initialize method was called." );
                    ok( this instanceof Gillie, "`this` should be an instance of Gillie" );

                    // Check on prototype
                    ok( [ this.__proto__.el, this.__proto__.events, this.__proto__.onClick ], 'Attributes extend prototype object.' );
                }

                // Element to bind to
            ,   el: "body"

                // Events
            ,   events: {
                    "click .dummy": "onClick"
                }

            ,   onClick: function( e ) {
                    ok( this instanceof Gillie, "`this` within click callback should be the global context." );
                    ok( true, "Event was bound." );

                }

        });

        // Instanciate a new person
        var john = new Person;
        dummyEl.trigger( "click" );

    });


});
