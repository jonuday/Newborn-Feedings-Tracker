// --> js/collections/feedings.js
var app = app || {};

app.Feedings = Backbone.Collection.extend({
    model: app.Feeding,
    url: '/feedings',

    initialize: function() {
        console.log('collection initialized');
    }
});
