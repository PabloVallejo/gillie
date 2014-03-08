---
layout: page
title: Model API reference
---

<a name="initialize"></a>
### Initialize `initialize: function() {}`

Initialize method gets runed every time a model, view or handler is instantiated. It receives no parameters.

**Usage**

{% highlight js %}
var Person = Gillie.Model.extend({

    // Run on instantiation
    initialize: function() {
        console.log( 'Person model has been instantiated' );
    }
});

// Create an instance, will output the message inside "initialize" through the console
var john = new Person();
{% endhighlight %}

**Arguments**

_None_

**Returns**

_null_

<a name="defaults"></a>
### Defaults `defaults: {}`

Default attributes we want our model to have when it's instantiated. This defaults are overwritten when we set them in the model.

**Usage**

{% highlight js %}
var Person = Gillie.Model.extend({

    // Default attributes
    defaults: {
            'alias': 'none'
        ,   'picture': 'default.jpg'
    }

});


// Instantiate Person
var john = new Person();

// By default, John's picture will be "default.jpg"
john.get( 'picture' ); // default.jpg

// However, we can change it.
john.set( 'picture', 'john-pic.jpg' );
{% endhighlight %}

<a name="url"></a>
### URL `url: {}`

This attribute is intended to be the base URL for all request methods.

**Usage**

{% highlight js %}
var Person = Gillie.Model.extend({

        defaults: {
            'picture': 'default.jpg'
        }

        // Default URL for all requests
    ,   url: 'http://localhost/api/v1/'

        // Save
    ,   save: function() {

            this.Post( 'person/', 'person.create' );
        }

});

var john = new Person({
        'name': 'John'
    ,   'picture': 'john.jpg'
});

// Saving model will make a POST request
// to 'http://localhost/api/v1/person/'
john.save();
{% endhighlight %}

<a name="request-methods"></a>
## Request methods

Gillie provides request methods, to match four HTTP verbs `GET`, `POST`, `PUT` and `DELETE`.

<a name="req-post"></a>
### Post `model.Post( path, event, options )`

Performs a `POST` request to an URL built using the base URL plus the path passed. After request is finished, triggers an event with the key of the `event`. So if you pass `resource.event` as event, it will be triggered by the model and listeners will receive as parameters, the model instance and the server response.

**Usage**
{% highlight js %}
var Person = Gillie.Model.extend({

    // Create person
    create: function( event ) {
        this.Post( 'person/', event, {} );
    }

});

var david = new Person({
        'location': 'Nevada'
    ,   'picture': 'david.jpg'
});

// Create person and trigger 'person.create' event afterwards, so that the "view" can render the new created model.
david.create( 'person.create' );
{% endhighlight %}

**Arguments**

<table>
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>path</td>
            <td><span class="label label-primary">string</span></td>
            <td>Part of the URL after the base one.</td>
        </tr>
        <tr>
            <td>event</td>
            <td><span class="label label-primary">string</span></td>
            <td>Event triggered by the model when the request finishes.</td>
        </tr>
        <tr>
            <td>options</td>
            <td><label class="label label-default">object</label></td>
            <td>Additional attributes that can be passed as AJAX options, like success, error, etc.</td>
        </tr>
    </tbody>
</table>


**Returns**

_xhr_

<a name="Get"></a>
### Get `model.Get( path, event, options )`

Performs a `GET` request to the specified URL.

**Usage**

{% highlight js %}
var Person = Gillie.Model.extend({

    // Get data from server
    sync: function( event ) {
        this.Get( 'person/:_id', event );
    }

});

// Create person and get their info
var maria = new Person({
    _id: 10
});

// Get maria's info, and trigger 'person.get' after request finished.
maria.get( 'person.get' );
{% endhighlight %}

**Arguments**

<table>
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>path</td>
            <td><span class="label label-primary">string</span></td>
            <td>Part of the URL after the base one.</td>
        </tr>
        <tr>
            <td>event</td>
            <td><span class="label label-primary">string</span></td>
            <td>Event triggered by the model when the request finishes.</td>
        </tr>
        <tr>
            <td>options</td>
            <td><label class="label label-default">object</label></td>
            <td>Additional attributes that can be passed as AJAX options, like success, error, etc.</td>
        </tr>
    </tbody>
</table>


**Returns**

_xhr_


## Put `model.Put( path, event, options )`

Performs a `PUT` request to the server.

**Usage**

{% highlight js %}
var Person = Gillie.Model.extend({

    // Update person
    update: function( event ) {
        this.Put( 'person/:_id', event );
    }

});

var jordan = new Person({
        '_id': 11
    ,   'localtion': 'New York'
});

// Update Jordan's data, and trigger 'person.update' after request finishes.
jordan.update( 'person.update' );

{% endhighlight %}

**Parameters**

<table>
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>path</td>
            <td><span class="label label-primary">string</span></td>
            <td>Part of the URL after the base one.</td>
        </tr>
        <tr>
            <td>event</td>
            <td><span class="label label-primary">string</span></td>
            <td>Event triggered by the model when the request finishes.</td>
        </tr>
        <tr>
            <td>options</td>
            <td><label class="label label-default">object</label></td>
            <td>Additional attributes that can be passed as AJAX options, like success, error, etc.</td>
        </tr>
    </tbody>
</table>

**Returns**

_xhr_


### Delete `model.Delete( path, event, options )`

Makes a `DELETE` request to the specified URL, intended to remove resources from the database.

**Usage**

{% highlight js %}
var Person = Gillie.Model.extend({

   // Delete person
   delete: function( event ) {
        this.Delete( 'person/:_id', event );
   }

});

var jenny = new Person({
        _id: 13
})

// Delete person from the server, and trigger 'person.delete' event afterwards, which can be used for listeners to alter the DOM and the like.
jenny.delete( 'person.delete' );

{% endhighlight %}

**Parameters**

<table>
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>path</td>
            <td><span class="label label-primary">string</span></td>
            <td>Part of the URL after the base one.</td>
        </tr>
        <tr>
            <td>event</td>
            <td><span class="label label-primary">string</span></td>
            <td>Event triggered by the model when the request finishes.</td>
        </tr>
        <tr>
            <td>options</td>
            <td><label class="label label-default">object</label></td>
            <td>Additional attributes that can be passed as AJAX options, like success, error, etc.</td>
        </tr>
    </tbody>
</table>

**Returns**

_xhr_


## Get and set and unset

Useful functions to get, set and remove model attributes.

<a name="get"></a>
### get `model.get( key )`

Get an attribute from the model.

**usage**

{% highlight js %}
var Car = Gillie.Model.extend({});

// Create a new car
var camaro = new Car({
        year: 2014
    ,   cubic_inches: 378
    ,   manufacturer: 'Chevrolet'
});

// Get and print car manufacturer through the console.
var manufacturer = camaro.get( 'manufacturer' );
console.log( manufacturer ); // Chevrolet
{% endhighlight %}

**Parameters**

<table>
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>key</td>
            <td><span class="label label-primary">string</span></td>
            <td>Model attribute to get the value of</td>
        </tr>
    </tbody>
</table>


**Returns**

_mixed_


<a name="set"></a>
### set `model.set( key, val )`, `model.set( object )`

Set an attribute or a set of attributes to the model.

**Usage**

{% highlight js %}

var Car = Gillie.Model.extend({});

var camaro = new Car();

// Set attribute by passing key, value.
camaro.set( 'year', 2014 );


// Set model attributes passing and object of key, values to set.
camaro.set({
        manufacturer: 'Chevrolet'
    ,   cubic_inches: 378
});

// Get attributes.
console.log( camaro.get( 'year' ) ); // 2014
{% endhighlight %}

**Parameters**

<table>
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>key</td>
            <td>
                <span class="label label-primary">string</span> Or
                <span class="label label-primary">object</span>
            </td>
            <td>Name of the attribute we're setting. If we pass an object of key value pairs, there is no need to use the second parameter.</td>
        </tr>
        <tr>
            <td>value</td>
            <td>mixed</td>
            <td>Value of the attribute we want to store.</td>
        </tr>
        <tr>
            <td>options</td>
            <td><label class="label label-default">object</label></td>
            <td>Additional attributes that can be passed as AJAX options, like success, error, etc.</td>
        </tr>
    </tbody>
</table>



**Returns**

<span class="label label-primary">object</span> Model instance

<a name="unset"></a>
### unset `model.unset( key )`

Removes a model attribute.

**Usage**

{% highlight js %}
var Car = Gillie.Model.extend({});

var camaro = new Car({
        year: 2014
    ,   cubic_inches: 378
    ,   color: 'black'
});

// Remove color from car
camaro.unset( 'color' );

console.log( camaro.get( 'color' ) ); // null
{% endhighlight %}

<a name="toJSON"></a>
### toJSON `model.toJSON()`

Return an object with the model attributes.

**Usage**

{% highlight js %}
var Car = Gillie.Model.extend({});

var camaro = new Car({
        year: 2014
    ,   manufacturer: 'Chevrolet'
});

// Get an object with model attributes.
var attributes = camaro.toJSON();
console.log( attributes ); // { year: 2014, manufacturer: 'Chevrolet' }
{% endhighlight %}


**Returns**

<span class="label label-primary">object</span>

## Events

As well as the `views`, `models` can triger and listen for events. To take a look at how events work, go to [events API](http://pablovallejo.github.io/gillie/events)
