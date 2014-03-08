---
layout: page
title: View API reference
---

In Gillie, and following the [observer](http://) design pattern, Views are intended to listen for model events and take actions on the DOM.

<a name="initialize"></a>
## Initialize `initialize: function()`

Initialize method gets called when an instance is created. This method is particularly useful in views because here we can declare all the events the view is going to be listening to.

**Usage**

{% highlight js %}
var Post = Gillie.View.extend({

        initialize: function() {

            // Listen for model 'post.create' event
            model.on( 'post.create', this.onCreate );
        }


        // Called after a post is created
    ,   onCreate: function( modelInstance, response ) {

            // Paint the new post in the DOM...
        }

});

// Create a Post instance which will run the initialize method.
var postView = new Post();
{% endhighlight %}