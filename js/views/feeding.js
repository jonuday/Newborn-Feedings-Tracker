// --> js/views/feeding.js

var app = app || {};

app.FeedingView = Backbone.View.extend({
    tagName: 'article',
    className: 'feeding',
    template: _.template($('#feedingTemplate').html()),

    events: {
        'click .delete': 'deleteFeeding',
        'click .edit'  : 'editFeeding',
        'click .cancel': 'editFeeding',
        'click .save'  : 'saveFeeding'
    },

    initialize: function() {
        console.log('model view initialized');
    },

    deleteFeeding: function() {
        this.model.destroy();
        this.remove();
    },

    editFeeding: function (){
    	this.$('.display, .edit, .save, .cancel').toggle();
    	this.$('.editing').toggleClass('active');
    },

    saveFeeding: function(e) {
    	e.preventDefault();

    	var formData = {};

    	this.$('.active').find('input').each(function (i,el) {

    		if ($(el).val != '') {
    			formData[el.id] = $(el).val();
    		}

    	});

    	// save the revised model
    	this.model.save(formData);
    	this.render();

    	// this.$('.display, .edit, .save, .cancel').toggle();
    	// this.$('.editing').toggleClass('active');

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});
