
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

    var text = event.target.text.value;

    Blogs.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
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
