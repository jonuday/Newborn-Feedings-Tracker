// --> js/models/feeding.js

var app = app || {};

app.Feeding = Backbone.Model.extend({
    defaults: {
        date: 'mm/dd/yyyy',
        time: '0:00',
        breast: false,
        supplement: false,
        amount: 0,
        pumping: false,
        pee: false,
        poop: false
    },

    initialize: function() {
        console.log('model initialized');
    }
});

