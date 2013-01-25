FED2.RankingList = Backbone.View.extend({
	el: $("#rankingTableView"),
	table:  $('#rankingTable'),


events:{
	'click button#addRank': 'addRank',
	'click button#filterWins': 'filterWins',
	'click button#showAll': 'showAll'
},

	initialize: function(){
		//bind de functies aan 'this'.
		_.bindAll(this, 'render', 'renderRanking', 'addRank', 'appendRank', 'filterWins', 'showAll', 'filterList');
		//geef this een collectie met models
		this.collection = new FED2.Rankings(FED2.rankingData);
		//als add word ingedrukt, append dan een nieuwe rank met de gegevens
		this.collection.on("add", this.appendRank);
		//asl de resetknop word ingedrukt, render dan de view opnieuw.
		this.collection.on("reset", this.render, this);
		//this.render();
	},

	render: function(){
		this.table.html('');
		_.each(this.collection.models, function(model){
			this.renderRanking(model);
	
		}, this);
	},

	renderRanking: function(model){

		var rankingView = new FED2.RankingView({
			model:model
		});

		this.table.append(rankingView.render().el);
		console.log(this.$el);
	},

	addRank: function(evt){
		evt.preventDefault();
		
		//voeg de waarden uit het formulier toe aan variabelen.
		var teamName = $("#teamName").val();
		var win = $("#win").val();
		var lost = $("#lost").val();
		var setsWon = $("#setsWon").val();
		var setsLost = $("#setsLost").val();
		var pointsWon = $("#pointsWon").val();
		var pointsLost = $("#pointsLost").val();

		var teamInfo = {};

		//als de variabelen niet leeg zijn, zet ze dan in het object
		if(teamName != ''){
			teamInfo.team = teamName;
		}

		if(win != ''){
			teamInfo.Win = win;
		}

		if(lost != ''){
			teamInfo.Lost = lost;
		}

		if(setsWon != ''){
			teamInfo.Sw = setsWon;
		}

		if(setsLost != ''){
			teamInfo.Sl = setsLost;
		}

		if(pointsWon != ''){
			teamInfo.Pw = pointsWon;
		}

		if(pointsLost != ''){
			teamInfo.Pl = pointsLost;
		}

		FED2.rankingData.push(teamInfo);

		this.collection.add(teamInfo)

	},

	appendRank: function(model){
		//reset de collection en render deze opnieuw
		this.collection.reset(FED2.rankingData);
	},

	filterWins: function(evt){
		evt.preventDefault();
		//filter de lijst op het aantal wins
		this.filterList("wins");
	},

	showAll: function(evt){
		evt.preventDefault();
		//filter de lijst niet.
		this.filterList("none");
	},

	filterList: function(filterType){
		if(filterType === "none"){
			this.collection.reset(FED2.rankingData);
		}else if(filterType === "wins"){
			this.collection.reset(FED2.rankingData, {silent: true});
			//geef het aantal models terug waarin het aantal wins groter is dan het aantal losses
			var filterData = _.filter(this.collection.models, function(model){
				return parseInt(model.get('Win')) > parseInt(model.get('Lost'));
			});

			this.collection.reset(filterData);
		}
	}


});

var rankinglist = new FED2.RankingList();
