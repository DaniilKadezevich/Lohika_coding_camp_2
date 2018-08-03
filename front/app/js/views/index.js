App.Templates.users = _.template($("#template-Users").html());
App.Views.Users = Backbone.View.extend({
    el: $("#container"),
    template: App.Templates.users,
    state: {},
    events: {
        "submit #users-add":  "createNewUser",
        "click .bulk-delete": "bulkDelete",
    },
    initialize() {
        _.bindAll(this, "render", "beforeRender", "afterRender" ,"addOne", "addAll", "onModelChange");
        this.collection.bind("update", this.render);
        this.collection.bind("add", this.addOne);
        this.collection.bind("change", this.onModelChange);
    },
    render() {
        this.beforeRender();
        this.$el.html(this.template());
        this.afterRender();
        return this;
    },
    beforeRender() {

    },
    afterRender() {
        this.state = {
            ...this.state, 
            bulk: this.$el.find('.bulk-delete'),
            list: this.$el.find('ul'),
            form: this.$el.find('.form-wrapper'),
            button: this.$el.find('.form-toggle'),
        }
        this.state.button.on('click', event => this.toggleUserAddForm(event));
        this.addAll();
    },
    addAll() {
        this.collection.each(this.addOne);
    },
    addOne(model) {
        view = new App.Views.User({ model });
        $("ul", this.el).append(view.render());
    },
    onModelChange(){
        this.state = {...this.state, filtered: this.collection.where({checked: true})};
        this.state.bulk.prop('hidden', this.state.filtered.length < 2);
    },
    bulkDelete(){
        this.state.filtered.forEach(model => model.destroy());
    },
    createNewUser(event) {
        event.preventDefault();
        const newUser = $(event.target).serializeArray().reduce((prev, curr) => {
            prev[curr.name] = curr.value;
            return prev;
        },{});
        $(event.target).find('input').each((i, input) => input.value = "");
        this.collection.create(newUser);
    },
    toggleUserAddForm(event){
        event.preventDefault();
        event.target.classList.toggle('clicked');
        this.state.form.toggle();
    },
});
 
App.Templates.user = _.template($("#template-User").html());
App.Views.User = Backbone.View.extend({
    tagName: "li",
    template: App.Templates.user,
    events:{
        'change .toggle': 'toggleUser',
        'click .delete': 'removeUser',
        'click .user-link': 'userPage',
    },
    initialize() {
        this.model.on('change:checked', () => this.toggleDeleteButton());
    },
    render() {
        return this.$el.append(this.template(this.model.attributes));
    },
    toggleUser() {
        this.model.toggle(); 
    },
    removeUser() {
        this.model.destroy();
    },
    userPage(event) {
        event.preventDefault();
        App.router.navigate(`users/${this.model.attributes.user_id}`, {trigger:true});
    },
    toggleDeleteButton() {
        if(App.users.where({checked: true}).length < 2) {
            this.$el.find('.delete').prop('hidden', !this.model.attributes.checked);
        } else {
            this.$el.parent().find('.delete:not([hidden])').prop('hidden', true)
        }
    }
});

App.Templates.userPage = _.template($("#template-UserPage").html());
App.Views.UserPage = Backbone.View.extend({
    el: $("#container"),
    template: App.Templates.userPage,
    initialize() {
        _.bindAll(this, "render");
        this.model.bind("sync", this.render);
    },
    render() {
        return this.$el.html(this.template(this.model.attributes));
    },
});