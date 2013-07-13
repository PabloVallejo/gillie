/**
* Inheritance tests
*/

$( document ).ready( function() {

    module( 'Inheritance and _super' );

    test( 'Simple inheritance', 3, function() {

        var Model = Gillie.Model.extend({
            
                initialize: function() {
                    this.setName();

                    // Check on prototype
                    ok( [ this.__proto__.on, this.__proto__.trigger, this.__proto__.setName ], 'Attributes extend prototype object.' );
                }

            ,   setName: function() {
                    this.name = 'Calvin';
                    this.surname = 'Klein'
                }

            ,   getFullName: function() {
                    return this.name + ' ' + this.surname;
                }

        });

        var ModelChild = Model.extend({
            
                getFullName: function() {
                    return 'Sr. ' + this._super();
                }

        });

        var modelChild = new ModelChild();
        ok( modelChild instanceof Model, 'Instances of classes that extend a parent class should be instances of the parent class as well.' );
        strictEqual( modelChild.getFullName(), 'Sr. Calvin Klein' );

    });

});
