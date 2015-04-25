if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe("test logical limits on blog list", function() {
            before(function(done) {
                Meteor.autorun(function() {
                    Meteor.call('removeAllBlogs', function(err, data) {
						for (i = 0; i < 11; i++) {
							Blogs.insert({
								title: "title" + i,
								email: "email@email",
								text: "text",
								createdAt: new Date(i)
							});
						}
						done();
					});
                })
            });
            it("should show only 10 blogs", function() {
                Meteor.flush();
                chai.assert.equal(10, $(".blog_title").length);
            });
            it("should show newest blog first", function() {
                Meteor.flush();
                chai.assert.equal("title10", $(".blog_title").html());
            });
			after(function(done) {
				Meteor.call('removeAllBlogs', function(err, data) {
						done();
					});
			});
        });
    });
};