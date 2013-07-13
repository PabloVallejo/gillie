/**
* Gillie Handler
*
* Handler tests are based on Backbone.View tests
* https://github.com/jashkenas/backbone/blob/master/test/view.js
*/

$( document ).ready( function() {


    // Events
    module( 'Gillie.Handler' );

    test( 'Initialize', function() {

        var Handler = Gillie.Handler.extend({

            initialize: function() {
                this.name = 'John';
            }

        });

        strictEqual( new Handler().name, 'John' );

    });

    test( 'delegateEvents and calling class methods', 3, function() {

        var count = 0;

        // Dummy element
        var dummyEl = $( '<a class="dummy" href="#"></a>' );
        dummyEl.appendTo( "body" );

        var Handler = Gillie.Handler.extend({

                initialize: function() {}

            ,   el: 'body'

            ,   events: {
                    'click .dummy': 'increment'
                }

            ,   increment: function() {
                    this.incrementCallback();
                }

            ,   incrementCallback: function() {
                    count++;
                }

        });

        var handler = new Handler();

        // Trigger clicks
        dummyEl.trigger( 'click' );
        equal( count, 1 );

        dummyEl.trigger( 'click' );
        equal( count, 2 );

        dummyEl.trigger( 'click' );
        equal( count, 3 );

    });


    test( 'Custom events', 2, function() {

        var count = 0;

        var Handler = Gillie.Handler.extend({

                el: 'body'

            ,   events: {
                    'myCustomEvent': 'handle'
                }
            ,   handle: function() {
                    count++;
                }  
        });

        var handler = new Handler();
        $( 'body' ).trigger( 'myCustomEvent' ).trigger( 'myCustomEvent' );
        equal( count, 2 );

        $( 'body' ).trigger( 'myCustomEvent' );
        equal( count, 3 );

    });

});

