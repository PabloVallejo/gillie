Gillie - JavaScript MicroFramework
=======

Gillie is JavaScript micro-framework that lets you easily create JavaScript classes to better organize your app. Gillie can as well serve as an introductory framework to learn Backbone, given its similarities with a Backbone view. On the other hand Gillie is very easy to setup and only requires jQuery.

## Quick start

Download Giliie and include jQuery, Gillie and you app scripts.

```html

<script src="js/jquery.js"></script>
<script src="js/gillie.js"></script>
<script src="js/yourapp.js"></script>
```

## Basic Usage

```js

var view = Gillie.extend({

        // Method fired after instantiation
        initialize: function() {
            console.log( 'Initialize' );
        }

        // Bind events to elements
    ,   events: {
            '.my-link': handleClick
        }

        // Click callback
    ,   handleClick: function( e ) {
            e.preventDefault;

            // Change background color in the clicked element
            $( e.currentTarget ).css( 'background', 'red' );

        }

});

```

## Live Examples

You can refer to the examples put together in codePen.

- [Binding events](http://codepen.io/PabloVallejo/pen/fhHuC)
- [Getting data attributes](http://codepen.io/PabloVallejo/pen/rIbiE)
