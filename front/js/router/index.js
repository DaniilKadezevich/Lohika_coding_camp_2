App.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"
    },
    defaultRoute() {
        App.users = new App.Collections.Users();
        new App.Views.Users({collection: App.users});
        App.users.fetch();
    },
})  
 
const appRouter = new App.Router();
Backbone.history.start();