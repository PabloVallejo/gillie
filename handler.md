---
layout: page
title: Handler API reference
---

Handlers are the application concern that takes care of listening for DOM events and such as clicks, submits, keyups and the like, and then gets their data and pass it usually to the model which will save it to the database and will notify the view that something changed.

<a name="initialize"></a>
## Initialize `initialize: function()`

Initialize in the `handler` accomplishes the same purpose as it does in the `model` and `view`, it gets called every time an instance is created.

**Usage**

{% highlight js %}
var Posts = Gillie.Handler.extend({

    initialize: function() {

        // Get information from all posts
        // and trigger 'posts.get' event for listeners
        // to paint them
        model.sync( 'posts.get' );
    }
});

// Posts instance
var posts = new Post();
{% endhighlight %}

<a name="el"></a>
## Elelement `el: string`

`el` attribute acts as the container for the events we're defining, so if we set `el` to `.post-box`, all the events we define in `events` attribute, will only be bound to elements inside `.post-box`.


> If `el` is not specified, events will be bound to `document`

**Usage**


{% highlight js %}
var Posts = Gillie.Handler.extend({

        // Element to bind to
        el: '.posts-container'

    ,   events: {
            'click .post-title': 'showPost'
        }

        // Show post
    ,   showPost: function( e ) {
            e.preventDefault();

            // Do stuff ...
        }

});

// Create an instance and start listening for events
var posts = new Posts();
{% endhighlight %}


**Type**

<span class="label label-primary">string</span>

<a name="events"></a>
### Events `events: {}`

The `events` object is used to bind DOM events and map them to `handler` methods.

> The context inside an `event` callback is the `handler` itself, that is, `handler` methods can be called from events callbacks.

**Usage**

{% highlight js %}
var Posts = Gillie.Handler.extend({

        events: {
                'click .post-title': 'showPost'
            ,   'submit .update-post': 'updatePost'
            ,   'keyup .posts-search-field': 'findPosts'
        }

    ,   showPost: function( e ) {

            // We can call handler members from here.
            var title = this.cleanTitle(
                $( e.currentTarget ).data( 'title' );
            );

            // Do stuff ...
        }

    ,   cleanTitle: function( title ) {
            // Do stuff...
        }

    ,   updatePost: function( e ) {
            // Do stuff ...
        }

    ,   searchPosts: function( e ) {
            // Do stuff ...
        }

});

// Create a view instance
var posts = new Posts();
{% endhighlight %}


**Type**

<span class="label label-primary">string</span>