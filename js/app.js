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

// --> js/models/feeding.js
// var app = app || {};
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
        console.debug('model initialized');
    }
});


// --> js/collections/feedings.js
// var app = app || {};
app.Feedings = Backbone.Collection.extend({
    model: app.Feeding,
    url: '/feedings',

    initialize: function() {
        console.debug('collection initialized');
    }
});


// --> js/views/feeding.js
// var app = app || {};
app.FeedingView = Backbone.View.extend({
    tagName: 'article',
    className: 'feeding',
    template: _.template($('#feedingTemplate').html()),

    events: {
        'click .delete': 'deleteFeeding'
    },

    initialize: function() {
        console.debug('model view initialized');
    },

    deleteFeeding: function() {
        this.model.destroy();
        this.remove();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

// --> js/views/feedings.js
// var app = app || {};
app.FeedingsView = Backbone.View.extend({
    el: '#content',
    tagName: 'section',

    initialize: function(f) {
        this.collection = new app.Feedings(f);
        this.render();

        console.debug('collection view initialized');

        this.listenTo(this.collection, 'add', this.renderOne);
    },

    events: {
        'click #addFeeding': addFeeding
    },

    addFeeding: function(e) {
        e.preventDefault();

        var formData = {};

        $('.addFeeding').children('input').each(function() {
            if ($(el).val != null) {
                formData[el.id] = $(el).val();
            }
        });

        this.collection.add(new app.Feeding(formData));
    },

    render: function() {
        this.collection.each(function(item) {
            this.renderOne(item);
        }, this);
    },

    renderOne: function(item) {
        var feedingView = new app.FeedingView({
            model: item
        });
        this.$el.append(feedingView.render().el);
    }
});


AppRouter = Backbone.Router.extend({
    routes: {
        '/:id': 'getFeeding',
        '/': 'getFeedings',
        '*notfound': 'notFound'
    },

    initialize: function() {
        var tests = [{
            date: '06/22/2014',
            time: '2:58 PM',
            breast: true,
            supplement: false,
            amount: 0,
            pumping: true,
            pee: false,
            poop: false
        }, {
            date: '06/22/2014',
            time: '6:00 PM',
            breast: true,
            supplement: true,
            amount: 0.25,
            pumping: true,
            pee: true,
            poop: true
        }];

        app.collectionView = new app.FeedingsView(tests);

        console.debug('router initialized, tests loaded');
    },

    start: function() {
        Backbone.history.start({
            pushState: true
        });
        console.debug('app started');
    },

    getFeeding: function(item) {
        console.debug('route: get feeding ', item);
    },

    getFeedings: function() {
        feedings = new app.Feedings;
        feedingsView = new FeedingsView;

        console.debug('route: get all feedings');
    },

    notFound: function() {
        console.debug('route: not found');
    }

});

$(function() {

    var app = new AppRouter();
    app.start();

});