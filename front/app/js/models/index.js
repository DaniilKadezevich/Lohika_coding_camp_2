App.Models.User = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        checked: false,
    },
    urlRoot: 'http://localhost:3000/users',
    toggle() {
        this.set({checked: !this.get('checked')})
    },
});