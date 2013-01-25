FED2.Rankings = Backbone.Collection.extend({
	model: FED2.Ranking,
	initialize: function(){
		console.log('collection initialized');
	},

	comparator: function(rank){
		//sorteer op het aantal keren verloren.
		return rank.get('Lost');

	}
});