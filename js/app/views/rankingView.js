FED2.RankingView = Backbone.View.extend({
	template: $("#rankingView").html(),
	tagName: 'tr',

	events:{
		'click button.deleteRanking': 'remove'
	},

	initialize: function(){
		_.bindAll(this, 'render', 'remove', 'unrender')
		this.model.bind('remove', this.unrender);
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.toJSON()));

		return this;
	},
	//remove functie, destory het model
	remove: function(){
		this.model.destroy();
		var model = this.model;
	console.log(this);
var i = 0;
		_.each(FED2.rankingData, function(rank){
			
			if(rank.team == model.toJSON().team){
				FED2.rankingData.splice(i, 1);
				
			}

			i++;
		})
	},

	unrender: function(){
		this.$el.remove();
	}

});