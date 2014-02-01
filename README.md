Gillie - JavaScript MicroFramework
=======

Gillie is a JavaScript micro-framework that lets you easily structure your app using `models`, `views` and `handlers`. Gillie the things from Backbone, jQuery and Underscore, it is very easy to set up and it's only dependency is jQuery.

## Quick start

Include jQuery, Gillie and your app scripts.

```html

<script src="js/jquery.js"></script>
<script src="js/gillie.js"></script>
<script src="js/yourapp.js"></script>
```

## Overview

Gillie follows a `handler-model-view` architecture in order to group app sections.

## Basic Usage

This example illustrates how to get user data and persist it on the server side in a RESTful way.

  - Model


```js
// User model 
var UserModel = Gillie.Model.extend({
        
        // Defualt attributes
        defaults: {
                id: 0
            ,   email: ''
            ,   name: ''
        } 
    
        // Base URL
    ,   url: 'http://localhost/PHP/laravel/public/api/v1/'

        // Save user
    ,   save: function() {
                
            // Make a "POST" request passing the actual user's "id", save it
            // and trigger "user.save" event on success.
            this.Put( 'users/:id', 'user.update' );
        }      
});

var userModel = new UserModel();
```

- Handler

```js
// User handler
var UserHandler = Gillie.Handler.extend({

        // Element to bind from
        el: 'body'

        // Bind events to elements
    ,   events: {
            'click .update-user': 'updateUser'
        }

    ,   updateUser: function( e ) {
            e.preventDefault;
                
            var email = $( '.user-email' ).val()
            ,   id = $( '.user-id' ).val()
            ,   name = $( '.user-name' ).val();
    
            // Set user attributes on model and save
            userModel.set({
                    id: id
                ,   email: email
                ,   name: name
            }).save();

        }

});

// Instantiate handler
var userHandler = new UserHandler();

```

   - View

```js
// View
var UserView = Gillie.Model.extend({
        
        initialize: function() {
            
            // Bind to user save event
            userModel.on( 'user.update', this.showNotification );
        }
        
        // Show an alert after user is saved
    ,   showNotification: function( model, response ) {

            var name = model.get( 'name' );
            alert( 'Howdy ' + name + ' your account has been updated.' );
        }

});

var userView = new UserView();
```

## Contributing

Pull requests are highly appreciated. Feel free to report a bug, typo, enhancement or a feature you may want Gillie to have.
