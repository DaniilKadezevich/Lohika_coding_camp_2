App.Collections.Users = Backbone.Collection.extend({
    model: App.Models.User,
    url: 'http://localhost:3000/users'
})
