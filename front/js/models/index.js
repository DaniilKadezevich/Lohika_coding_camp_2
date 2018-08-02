App.Models.User = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
    },
    toggle() {
        const { firstName, lastName } = this.toJSON()
        console.log(`User ${firstName} ${lastName} Toggled`)
    },
});