
Blogs = new Mongo.Collection("blogs");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    blogs: function () {
      return Blogs.find({}, {sort: {createdAt: -1}});
    }
  });
  
  Template.body.events({
  "submit .new-blog": function (event) {
    // This function is called when the new blog form is submitted

    var title = event.target.title.value;
	var email = event.target.email.value;
	var text = event.target.text.value;

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
  "click .delete": function () {
    Blogs.remove(this._id);
  }
});
}
