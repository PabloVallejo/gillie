
// View
var View = Gillie.extend({

        // Element to bind from
        el: '.view'

        // events
    ,   events: {
            'click .animals-list p': 'describeAnimal'
        }

        // Shows animal's name and family
    ,   describeAnimal: function( e ) {

            var target = e.currentTarget
            ,  name = $( target ).data( 'name' )
            ,  family = $( target ).data( 'family' );

            // Show name and family
            $( '.name' ).text( name );
            $( '.family' ).text( family );

    }

});

// Run
var view = new View();