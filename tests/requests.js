/**
 * Request Tests
 */

$(document).ready(function(){

	// Model
	var person;
	Person = Gillie.Model.extend({

		// Base URL
		url: 'http://myapi.io'
	});

	// Requests
	//----------------
	module('Gillie requests', {

		setup: function() {

			// Create a new person
			person = new Person({
				name: 'Fonzie',
				age: 40
			});
		}
	});

	// Test Model.Post method
	test( 'Model.Post', function() {

		// Save user
		person.Post( '/person' );

		// Get data
		var data = JSON.parse( this.ajaxSettings.data );

		// Test equality
		equal( this.ajaxSettings.type, 'POST' );
		equal( this.ajaxSettings.dataType, 'json' );
		equal( this.ajaxSettings.url, 'http://myapi.io/person' );
		equal( data.name, person.get( 'name' ) );
		equal( data.age, person.get( 'age' ) );

	});

	// Test Model.Post passing a complete URL
	test( 'Model.Post full URL http', function() {

		// Save user
		person.Post( 'http://otherapi.io/person' );

		// Get data
		var data = JSON.parse( this.ajaxSettings.data );

		// Test equality
		equal( this.ajaxSettings.type, 'POST' );
		equal( this.ajaxSettings.dataType, 'json' );
		equal( this.ajaxSettings.url, 'http://otherapi.io/person' );
		equal( data.name, person.get( 'name' ) );
		equal( data.age, person.get( 'age' ) );

		console.log( this.ajaxSettings );

	});

	// Test Model.Post passing a complete URL
	test( 'Model.Post full URL https', function() {

		// Save user
		person.Post( 'https://otherapi.io/person' );
		equal( this.ajaxSettings.url, 'https://otherapi.io/person' );
	});

	// Test Model.Post passing a complete URL
	test( 'Model.Post full URL not https or http', function() {

		// Save user
		person.Post( 'ttps://otherapi.io/person' );
		equal( this.ajaxSettings.url, 'http://myapi.iottps://otherapi.io/person' );

	});

});
