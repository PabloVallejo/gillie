/**
* General Guillie tests
*
* Model, View and Controller have the same methods and structure,
* so by this version `0.2` of Gillie, they can be tested the same way.
*/

$( document ).ready( function() {

    // Gillie.Model
    //----------------------
    module( 'Gillie.Model' );

    test( 'Initialize', function() {

        // Initialize
        // Calling local methods
        // Events
    	var Model = Gillie.Model.extend({

    		initialize: function() {
    			this.name = 'John';
    		}
    	});

    	strictEqual( new Model().name, 'John' );

    });

    test( 'Calling Model Methods', 4, function() {

    	var Model = Gillie.Model.extend({

	    		initialize: function() {
	    			this.setName();
	    		}

            ,   defaults: {
                        location: 'New York'
                    ,   age: 0
                }

    		,	setName: function() {
	    			this.name = 'John';
	    			this.surname = 'Doe';
	    			ok( true, 'Model function was called.' )
	    		}

	    	,	getFullName: function() {
	    			return this.name + ' ' + this.surname
	    		}

    	});

    	strictEqual( new Model().getFullName(), 'John Doe' );
        var model = new Model({ age: 10, profession: 'student' });
        var model1 = new Model({ profession: 'student' });

    });


    test( 'Binding and triggering events', 4, function() {

    	var count = 0;
    	var Model = Gillie.Model.extend({

	    		initialize: function() {
	    			this.on( 'event', this.increment );
	    			this.on( 'event1 event2', this.increment );

	    			this.on({
	    					event3: this.increment
	    				,	event4: this.increment
	    			}, this );

	    			this.triggerEvents();
	    		}

	    	,	triggerEvents: function() {

	    			this.trigger( 'event' );
	    			this.trigger( 'event1' );
	    			this.trigger( 'event2' );

	    		}

    		,	increment: function() {
					count++;
	    		}
    	});

    	var model = new Model();
    	equal( count, 3 );

    	model.increment();
    	equal( count, 4 );

    	model.trigger( 'event3' );
    	equal( count, 5 );

    	model.trigger( 'event4' );
    	equal( count, 6 );

    });



    test( 'Set and unset', 4, function() {

        var m = new Gillie.Model({ id: 'id', foo: 1, bar: 2, baz: 3 });

        m.set({ 'foo': 2 });
        equal( m.get( 'foo' ), 2 );

        m.set( 'foo', 3 );
        equal( m.get( 'foo' ), 3 );

        m.unset( 'foo' );
        equal( m.foo, undefined );

        m.unset({ bar: '' });
        equal( m.bar, undefined );

    });


    // Gillie.view
    //----------------------
    module( 'Gillie.View' );

    test( 'Initialize', function() {

        // Initialize
        // Calling local methods
        // Events
    	var View = Gillie.View.extend({

    		initialize: function() {
    			this.name = 'John';
    		}
    	});

    	strictEqual( new View().name, 'John' );

    });

    test( 'Calling View Methods', 2, function() {

    	var View = Gillie.View.extend({

	    		initialize: function() {
	    			this.setName();
	    		}

    		,	setName: function() {
	    			this.name = 'John';
	    			this.surname = 'Doe';
	    			ok( true, 'View function was called.' )
	    		}

	    	,	getFullName: function() {
	    			return this.name + ' ' + this.surname
	    		}

    	});

    	strictEqual( new View().getFullName(), 'John Doe' );
    });


    test( 'Binding and triggering events', 4, function() {

    	var count = 0;
    	var View = Gillie.View.extend({

	    		initialize: function() {
	    			this.on( 'event', this.increment );
	    			this.on( 'event1 event2', this.increment );

	    			this.on({
	    					event3: this.increment
	    				,	event4: this.increment
	    			}, this );

	    			this.triggerEvents();
	    		}

	    	,	triggerEvents: function() {

	    			this.trigger( 'event' );
	    			this.trigger( 'event1' );
	    			this.trigger( 'event2' );

	    		}

    		,	increment: function() {
					count++;
	    		}
    	});

    	var View = new View();
    	equal( count, 3 );

    	View.increment();
    	equal( count, 4 );

    	View.trigger( 'event3' );
    	equal( count, 5 );

    	View.trigger( 'event4' );
    	equal( count, 6 );

    });


    // Gillie.Controller
    //----------------------
    module( 'Gillie.Controller' );

    test( 'Initialize', function() {

        // Initialize
        // Calling local methods
        // Events
    	var Controller = Gillie.Controller.extend({

    		initialize: function() {
    			this.name = 'John';
    		}
    	});

    	strictEqual( new Controller().name, 'John' );

    });

    test( 'Calling Controller Methods', 2, function() {

    	var Controller = Gillie.Controller.extend({

	    		initialize: function() {
	    			this.setName();
	    		}

    		,	setName: function() {
	    			this.name = 'John';
	    			this.surname = 'Doe';
	    			ok( true, 'Controller function was called.' )
	    		}

	    	,	getFullName: function() {
	    			return this.name + ' ' + this.surname
	    		}

    	});

    	strictEqual( new Controller().getFullName(), 'John Doe' );
    });


    test( 'Binding and triggering events', 4, function() {

    	var count = 0;
    	var Controller = Gillie.Controller.extend({

	    		initialize: function() {
	    			this.on( 'event', this.increment );
	    			this.on( 'event1 event2', this.increment );

	    			this.on({
	    					event3: this.increment
	    				,	event4: this.increment
	    			}, this );

	    			this.triggerEvents();
	    		}

	    	,	triggerEvents: function() {

	    			this.trigger( 'event' );
	    			this.trigger( 'event1' );
	    			this.trigger( 'event2' );

	    		}

    		,	increment: function() {
					count++;
	    		}
    	});

    	var Controller = new Controller();
    	equal( count, 3 );

    	Controller.increment();
    	equal( count, 4 );

    	Controller.trigger( 'event3' );
    	equal( count, 5 );

    	Controller.trigger( 'event4' );
    	equal( count, 6 );

    });


});
