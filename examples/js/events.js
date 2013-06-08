
// View
var View = Gillie.extend({

    // Element to bind from
    el: '.sample'

    // Events
  , events: {
      'click p': 'toggleParagraph'
    }

    // Slides up a paragraph
  , toggleParagraph: function( e ) {

    // Get the element we're clicking
      var target = e.currentTarget;

      // Slide it up
      $( target ).slideUp();
    }

});

// Run
var demo = new View();