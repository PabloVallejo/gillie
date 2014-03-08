---
layout: page
title: Events API reference
---

Events API provides three method that can be used for listening and triggering events in the `view` and `model`.

> These methods work exactly the same in both views and models

<a name="on"></a>
### On `on( event, fn )`

`on()` method, is used to listen for events and calling an function when such event is fired.

**Usage**

{% highlight js %}
// Model
var PostModel = Gillie.Model.extend({

        url: 'http://localhost/api/v1/'

    ,   create: function() {
            this.Post( 'post/', 'post.create' );
        }
});

// Create model instance
postModel = new PostModel({
        title: 'New post title'
    ,   description: 'Lorem ipsum dolor sit amet'
});

// View
var PostsView = Gillie.View.extend({

        initialize: function() {

            // Listen to model 'posts.create' event
            postModel.on( 'posts.create', this.onCreate );
        }

        // Fired when 'posts.create' is triggered
    ,   this.onCreate: function( postInstance ) {

            console.log( postInstance.get( 'title' ) +
                '. Has been created.'
            );
        }
});
postView = new PostView();

// So now it we save the post using `create` model method,
// the view will reach when the post is saved.
postModel.create(); // New post title. Has been created.
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
            <td>event</td>
            <td>
                <span class="label label-primary">string</span>
                or
                <span class="label label-default">object</span>
            </td>
            <td>Event we want to bind to. Or object with key, value event name and callback.</td>
        </tr>
        <tr>
            <td>fn, callback</td>
            <td><span class="label label-success">function</span></td>
            <td>Function to call when the event is triggered.</td>
        </tr>
    </tbody>
</table>

**Returns**

> self instance

<span class="label label-default">self</span>

<a name="trigger"></a>
### Trigger `trigger( event, data )`

Trigger an event passing the specified arguments to the listeners.


**Usage**

{% highlight js %}

// Create model and model instance
var PostModel = Gillie.Model.extend({});
var postModel = new PostModel();

// View
var PostView = Gillie.View.extend({

        initialize: function() {
            postModel.on( 'post.custom_event', this.onCustomEvent );
        }

    ,   onCustomEvent: function( str, obj ) {

            console.log( str ); // Additional data
            console.log( obj ); // { one: 1, two: 2 }
        }
});

// Create View instances
var postView = new PostView();

postModel.trigger(
        'post.custom_event'
    ,   'Additional data'
    ,   { one: 1, two: 2 }
);

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
            <td>event</td>
            <td>
                <span class="label label-primary">string</span>
            </td>
            <td>Event we want to trigger.</td>
        </tr>
        <tr>
            <td>data</td>
            <td>mixed</td>
            <td>Data we want to pass to listeners. It can be one or multiple arguments.</td>
        </tr>
    </tbody>
</table>

**Returns**

> Self instance

<span class="label label-default">self</span>

<a name="listen-to"></a>
### Listen to `obejct.listenTo( object, event, fn )`

`listenTo` makes an object listen for other object an event and trigger a callback when the event is fired.

**Usage**

{% highlight js %}
var PostModel = Gillie.Model.extend({});
var postModel = new PostModel();

// View
var PostView = Gillie.View.extend({

    onEdit: function( attributes ) {
        console.log( attributes ); // { title: 'New title' }
    }
});
var postView = new PostView();

// Listen for model 'post.change' event
postView.listenTo( postModel, 'post.change', postView.onEdit );

// Trigger model event
postModel.set( 'title', 'New title' )
    .trigger( 'post.change', postModel.toJSON() );


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
            <td>object</td>
            <td>
                <span class="label label-default">object</span>
            </td>
            <td>Object where we want to listen for the event</td>
        </tr>
        <tr>
            <td>event</td>
            <td><span class="label label-primary">string</span></td>
            <td>Name of the event we want to listen to</td>
        </tr>
        <tr>
            <td>fn</td>
            <td><span class="label label-success">function</span></td>
            <td>Callback function to trigger when the event is fired</td>
        </tr>
    </tbody>
</table>