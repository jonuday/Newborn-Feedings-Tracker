// --> js/views/feedings.js

var app = app || {};

app.FeedingsView = Backbone.View.extend({
    el: '#content',

    initialize: function (initialFeedings) {
        this.collection = new app.Feedings(initialFeedings);
        this.render();

        this.listenTo(this.collection, 'add', this.renderOne);

        $('.addFeeding').on('click','a',function(){ 
        	$(this).toggleClass('open');
        	$(this).next('div').toggle('slow'); 

        	d = new Date();
			month = d.getMonth() + 1;
			$('.addFeeding #date').val(month+'/'+d.getDate()+'/'+d.getYear());
			$('.addFeeding #time').val(d.getHours() + ':'+ d.getMinutes());
        	d = '';
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

