---
layout: page
title: Gillie, JavaScript MVC micro framework inspired in Backbone
---

Gillie is a lightweight MVC framework inspired in [Backbone](http://backbonejs.org). It provides useful methods to perform RESTful HTTP requests and allows for a separation of concerns using [models](/gillie/model), [views](/gillie/view) and [handlers](/gillie/handler). On the other hand offers an [events](/gillie/events) API with which you can make your views listen for model events and take the appropriate actions, following in that way the [observer](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript) design pattern.

**Get the code**

<a href="http://pablovallejo.github.io/gillie/dist/gillie.js" class="btn btn-success">Development version (0.2)</a> <small>_16 k_</small>

<a href="http://pablovallejo.github.io/gillie/dist/gillie.min.js" class="btn btn-primary">Production version (0.2)</a>
<small>_4 K_</small>


--------------

### Structuring your app

Gillie follows an MVC design, however, the controller is called handler. The idea behind the handler is to listen for DOM events, get their data, and pass it to the model to save it. Once the model finishes saving the data, will trigger an event that usually the view was listening for in order to repaint the DOM.


![Structure](http://pablovallejo.github.io/gillie/public/images/mvc.jpg)

### Philosophy

The objective of Gillie is to make it easy for people to get used to JavaScript design patterns and to grasp a basic understanding of MV* in the browser for them to feel comfortable when using other libraries like [Backbone](http://backbonejs.org), [AngularJS](http://angularjs.org/), [EmberJS](http://emberjs.com/) and the like.


### Hello world

{% highlight js %}
var MainHandler = Gillie.Handler.extend({

    initialize: function() {
        alert( 'Hello world!' );
    }

});

// Instantiate handler
var mainHandler = new MainHandler();
{% endhighlight %}


### DOM Events
{% highlight js %}
var AppHandler = Gillie.Handler.extend({

        events: {
            'click a': 'turnRed'
        }

    ,   turnRed: function( e ) {
            e.preventDefault();

            var target = e.currentTarget;
            $( target ).css( 'color', 'red' );

        }
});

// Instantiate handler
var appHandler = new AppHandler();

{% endhighlight %}

### Saving data in the server

> Model

When `Post` finishes with the request, it will trigger the `event` in the model passing an instance and the server's response to listeners.

{% highlight js %}
var TodoModel = Gillie.Model.extend({

        url: 'http://localhost/api/'

    ,   create: function( event ) {
            this.Post( 'todo/', event );
        }

});

// Crete model instance
var todoModel = new TodoModel();

{% endhighlight %}

> View

{% highlight js %}

var TodoView = Gillie.View.extend({

        initialize: function() {

            // Bind to 'todo.create' event
            todoModel.on( 'todo.create', this.onCreate );
        }


    ,   onCreate: function( instance, response ) {
            alert( instance.get( 'title' ) + '. Has been saved' );
        }

});

// Create view instance
var todoView = new TodoView();

{% endhighlight %}

> Handler

{% highlight js %}

var TodoHandler = Gillie.Handler.extend({

        events: {
            'keypress #new-todo': 'createOnEnter'
        }

    ,   createOnEnter: function( e ) {

            var enterKey = 13
            ,   currentTarget = e.currentTarget;

            if ( e.which != enterKey ) return;

            var title = $( target ).val();
            todoModel.set( 'title', title )
                .create( 'todo.create' );

        }
});

// Create handler instance
var todoHandler = new TodoHandler();
{% endhighlight %}

### History

We were working in a JavaScript project that had a large codebase, at the same time I was learning Backbone on my own, and was fascinated with it, one day I thought that it would be nice to use Backbone in our project, so that we could take advantage of its features.

Even though we were separating concerns on the project,
we decided not no implement Backbone until we learned more about how to use it. Instead we decided to create a small library which would have some Backbone features to start moving the project towards the architecture it suggests. Eventually we added enough functionality to the library until the point we decided to stick with it.

It is in this way that Gillie was born.



### Usage

{% highlight html %}
<script src="js/jquery.js"></script>
<script src="js/gillie.js"></script>
<script src="js/yourapp.js"></script>
{% endhighlight %}

<a name="order-of-scripts-inclusion"></a>
### Order of scripts inclusion

When including you app scripts, it's important to include first, **Models**, the **Views** and **Handlers** at the end, so that **Views**, and **Handlers** have access to **Models**.

**Good example**

{% highlight html %}
<script src="js/models/post.js"></script>

<!-- View will have access to model, and can listen for it's events  -->
<script src="js/views/post.js"></script>

<!-- Handler can create models as they're defined above -->
<script src="js/handler/post.js"></script>
{% endhighlight %}

**Bad example**
{% highlight html %}

<!-- This handler won't have access to `post` model -->
<script src="js/handler/post.js"></script>

<!-- This view, won't be able to listen to `post` model, as we haven't defined it yet. -->
<script src="js/views/post.js"></script>

<!-- When we include models after Views, and Handlers, they won't have access to it.  -->
<script src="js/models/post.js"></script>
{% endhighlight %}

### Credits

Gillie class structure is based on [Simple class inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) by [John Resig](http://ejohn.org/). Events API, DOM events declaration and models have been adapted from [Backbone](http://backbonejs.org).

The documentation template is based on [hyde](https://github.com/poole/hyde) by [Mark Otto](https://twitter.com/mdo).

Thank to [Addy Osmany](http://addyosmani.com/) for his great book on [JavaScript Design Patters](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) which was very useful for this project.

