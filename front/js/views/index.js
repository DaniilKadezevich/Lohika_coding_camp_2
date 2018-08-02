App.Templates.users = _.template($("#template-Users").html())
App.Views.Users = Backbone.View.extend({
    el: $("#container"),
    events: {
        "submit #users-add":  "createNewUser",
    },
    template: App.Templates.users,
    initialize() {
        _.bindAll(this, "render", "addOne", "addAll");
        this.collection.bind("update", this.render);
        this.collection.bind("add", this.addOne);
    },
 
    render() {
        this.$el.find("#users").html(this.template());
        this.addAll();
    },
 
    addAll() {
        this.collection.each(this.addOne);
    },
 
    addOne(model) {
        view = new App.Views.User({ model });
        $("ul", this.el).append(view.render());
    },
    createNewUser(event) {
        event.preventDefault();
        const newUser = $(event.target).serializeArray().reduce((prev, curr) => {
            prev[curr.name] = curr.value;
            return prev;
        },{});
        this.collection.create(newUser);
    },
})
 
App.Templates.user = _.template($("#template-User").html())
App.Views.User = Backbone.View.extend({
    tagName: "li",
    template: App.Templates.user,
    events:{
        'change .toggle': 'toggleUser',
        'click .delete': 'removeUser',
    },
    initialize() {
        _.bindAll(this, 'render');
    },
    render() {
        return $(this.el).append(this.template(this.model.toJSON())) ;
    },
    toggleUser() {
        this.model.toggle();
    },
    removeUser() {
        this.model.destroy();
    }
})