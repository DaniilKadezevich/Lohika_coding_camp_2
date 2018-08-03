App.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "users/:id": "users"
    },
    index() {
        App.users = new App.Collections.Users();
        new App.Views.Users({collection: App.users});
        App.users.fetch();
    },
    users(id) {
        App.user = new App.Models.User({id});
        new App.Views.UserPage({model: App.user});
        App.user.fetch();
    }
})  
 
App.router = new App.Router();
Backbone.history.start();