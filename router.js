var AppRouter = Backbone.Router.extend({
        routes: {
            "tournament": "tournament",
            "notournament": "notournament",
            "*actions": "defaultRoute" // Backbone will try match the route above first
        }
    });
    // Instantiate the router
    var app_router = new AppRouter;
    app_router.on('route:tournament', function (id) {

        console.log('route: tournament');

        // Note the variable in the route definition being passed in here
        rankinglist.render();

		//this.table.append(rankingView.render().el);
		//console.log(this.$el);
    });

       app_router.on('route:notournament', function (id) {

        console.log('route: tournament');

        // Note the variable in the route definition being passed in here
        

        //this.table.append(rankingView.render().el);
        //console.log(this.$el);
    });


    app_router.on('route:defaultRoute', function (actions) {
        alert( actions ); 
    });
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();


		