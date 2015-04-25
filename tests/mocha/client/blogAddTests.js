if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe("test blog add/remove", function() {
            beforeEach(function(done) {
                Meteor.autorun(function() {
                    Meteor.call('removeAllBlogs', function(err, data) {
						$("#title").val("title_added");
						$("#email").val("email@email");
						$("#text").html("bla bla");
						$(".new-blog").submit();
						done();
					});
                });
            });
            it("should add new blog post", function(done) {
                Meteor.flush();
                chai.assert.equal("title_added", $(".blog_title").html());
				done();
            }); 
			afterEach(function(done) {
				Meteor.call('removeAllBlogs', function(err, data) {
						done();
					});
			});
        });
    });
};