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

	// Requests test setup
	//-----------------------
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
	// ------------------------
	test( 'Model.Post', function() {

		// Save user
		person.Post( '/person' );

		// Get data
		var data = JSON.parse( this.ajaxSettings.data );

		// Test AJAX Settings
		equal( this.ajaxSettings.type, 'POST' );
		equal( this.ajaxSettings.dataType, 'json' );
		equal( this.ajaxSettings.url, 'http://myapi.io/person' );

		// Test sent attributes
		equal( data.name, person.get( 'name' ) );
		equal( data.age, person.get( 'age' ) );

	});

	// Test Model.Post passing a complete URL
	test( 'Model.Post full URL http', function() {

		// Save user
		person.Post( 'http://otherapi.io/person' );

		// Get data
		var data = JSON.parse( this.ajaxSettings.data );

		// Test AJAX Settings
		equal( this.ajaxSettings.type, 'POST' );
		equal( this.ajaxSettings.dataType, 'json' );
		equal( this.ajaxSettings.url, 'http://otherapi.io/person' );

		// Sent attributes should math set ones
		equal( data.name, person.get( 'name' ) );
		equal( data.age, person.get( 'age' ) );

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

	// Test Model.Get
	// --------------------
	test( 'Model.Get', function() {

		// Get person info
		person.set( 'id', 10 )
			.Get( '/person/:id' );

		// Assert `ajaxSettings` attributes
		equal( this.ajaxSettings.type, 'GET' );
		equal( this.ajaxSettings.url, 'http://myapi.io/person/10' );
		equal( this.ajaxSettings.dataType, 'json' );

	});

	// Test Model.Put
	//---------------------
	test( 'Model.Put', function() {

		// Update person
		person.set({
				'id': 10
			,	'age': 20
			,	'name': 'The Fonz'
		}).Put( '/person/:id' );

		// Set PUT data
		var data = JSON.parse( this.ajaxSettings.data );

		// Test AJAX settings
		equal( this.ajaxSettings.type, 'PUT' );
		equal( this.ajaxSettings.url, 'http://myapi.io/person/10' );
		equal( this.ajaxSettings.dataType, 'json' );

		// Attributes should have been sent
		equal( data.id, 10 );
		equal( data.age, 20 );
		equal( data.name, 'The Fonz' );
	});

	// Test Model.Delete
	//---------------------
	test( 'Model.Delete', function() {

		// Delete person #10
		person.set( 'id', 10 )
			.Delete( '/person/:id' );

		// Test AJAX settings
		equal( this.ajaxSettings.type, 'DELETE' );
		equal( this.ajaxSettings.url, 'http://myapi.io/person/10' );
		equal( this.ajaxSettings.dataType, 'json' );
	});

});
