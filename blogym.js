
//database collection
Blogs = new Mongo.Collection("blogs");

//Routing
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function() {
    this.render('blogListTemplate');
});
Router.route('/blog/:_id', function() {
    var blog = Blogs.findOne({_id: this.params._id});
    this.render('showBlog', {data: blog});
});

// Client Code
if (Meteor.isClient) {
    Template.blogListTemplate.helpers({
        blogs: function() {
			//sort blogs by creation (newest first),
			//limit number of displayed entries
            return Blogs.find({}, {sort: {createdAt: -1}, limit: 10});
        }
    });

    Template.blogListTemplate.events({
        "submit .new-blog": function(event) {
            // This function is called when the new blog form is submitted
            var title = event.target.title.value;
            var email = event.target.email.value;
            var text = event.target.text.value;
			//insert to database
            Blogs.insert({
                title: title,
                email: email,
                text: text,
                createdAt: new Date() // current time
            });
            // Clear form
            event.target.title.value = "";
            event.target.email.value = "";
            event.target.text.value = "";
            // Prevent default form submit
            return false;
        }
    });

    Template.blog.events({
        "click .delete": function() {
			//remove from database
            Blogs.remove(this._id);
        }
    });
}
