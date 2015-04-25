if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe("test blog add/remove", function() {
            beforeEach(function(done) {
                Meteor.autorun(function() {
                    Meteor.call('removeAllBlogs', function(err, data) {
						Blogs.insert({
							title: "title",
							email: "email@email",
							text: "text",
							createdAt: new Date() // current time
						});
						done();
					});
                });
            });
            it("should show blog title in class blog_title", function() {
                Meteor.flush();
                chai.assert.equal("title", $(".blog_title").html());
            }); 
            it("should remove blog when button clicked", function() {
                Meteor.flush();
				chai.assert.equal(1, $(".blog_title").length);
                $(".blog_remove").click();
                chai.assert.equal(0, $(".blog_title").length);
            });
			afterEach(function(done) {
				Meteor.call('removeAllBlogs', function(err, data) {
						done();
					});
			});
        });
    });
};