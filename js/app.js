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
        console.log('model initialized');
    }
});


// --> js/collections/feedings.js
// var app = app || {};
app.Feedings = Backbone.Collection.extend({
    model: app.Feeding,
    url: '/feedings',

    initialize: function() {
        console.log('collection initialized');
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
        console.log('model view initialized');
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

    initialize: function (initialFeedings) {
        this.collection = new app.Feedings(initialFeedings);
        this.render();

        this.listenTo(this.collection, 'add', this.renderOne);

        $('.addFeeding').on('click','a',function(){ 
        	$(this).toggleClass('open');
        	$(this).next('div').toggle('slow'); 
        });
    },

    events: {
        'click #add': 'addFeeding'
    },

    addFeeding: function(e) {
    	e.preventDefault();

      	var formData = {};
 
        $('#addFeeding').find('input').each(function (i,el) {
            if ($(el).val != null) {
                formData[el.id] = $(el).val();
            }
        });

        this.collection.add(new app.Feeding(formData));
        
        // close the add form
        $('.addFeeding a').removeClass('open').next('div').hide('fast');
        
        // Reset the form
        $('#addFeeding')[0].reset();

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
        this.$el.prepend(feedingView.render().el);
    }
});


app.AppRouter = Backbone.Router.extend({
    routes: {
        '/:id': 'getFeeding',
        '': 'getFeedings',
        '*notfound': 'notFound'
    },

    initialize: function() {
        var tests = [
        	{ date: '06/22/2014', time: '2:58 PM', breast: true, supplement: false, amount: 0, pumping: true, pee: false, poop: false },
        	{ date: '06/22/2014', time: '6:00 PM', breast: true, supplement: true, amount: 0.25, pumping: true, pee: true, poop: true}
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