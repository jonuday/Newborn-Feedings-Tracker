/*
 *	Newborn Feeding Tracker
 *	version: 0.0.1
 *	authors: jonuday
 *
 *	Description:
 *	New born baby feeding and "results" tracker for laction plan tracking.
 *
 */

var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '/:id': 'getFeeding',
        '': 'getFeedings',
        '*notfound': 'notFound'
    },

    initialize: function() {
        var tests = [
        	{ date: '06/22/2014', time: '2:58 PM', breast: true, supplement: false, amount: 0, pumping: false, pee: false, poop: false }
        ];

        new app.FeedingsView(tests);

    },

    start: function() {
        Backbone.history.start({
            pushState: true
        });
        console.log('app started');
    },

    getFeeding: function(item) {
        console.log('route: get feeding ', item);
    },

    getFeedings: function() {
        feedings = new app.Feedings;
        feedingsView = new app.FeedingsView;

        console.log('route: get all feedings');
    },

    notFound: function() {
        console.log('route: not found');
    }

});

$(function() {

    var tracker = new app.AppRouter();
    tracker.start();

});