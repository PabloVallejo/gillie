/**
* Utilities
*/

( function() {

	var utils = {}

	// Extend a given object with all the properties in passed-in object(s)
	utils._extend = function( obj ) {

	    $.each( [].slice.call( arguments, 1 ), function( key, source ) {

	        if ( source ) {
	            for ( var prop in source ) {
	                obj[ prop ] = source[ prop ];
	            }
	        }
	    });

	    return obj;
	};

	// Global expose it
	window.utils = utils;

})();