if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe("test blog add/remove", function() {
            before(function(done) {
                Meteor.autorun(function() {
                    Meteor.call('removeAllBlogs')
                    Blogs.insert({
                        title: "title",
                        email: "email@email",
                        text: "text",
                        createdAt: new Date() // current time
                    });
                    done();
                })
            });
            it("should show blog title in class blog_title", function() {
                Meteor.flush();
                chai.assert.equal($(".blog_title").html(), "title");
            });
            it("should remove blog when button clicked", function() {
                Meteor.flush();
                $(".blog_remove").click();
                chai.assert.equal(0, $(".blog_title").length);
            });
        });
        describe("test logical limits on blog list", function() {
            before(function(done) {
                Meteor.autorun(function() {
                    Meteor.call('removeAllBlogs')
                    for (i = 0; i < 11; i++) {
                        Blogs.insert({
                            title: "title" + i,
                            email: "email@email",
                            text: "text",
                            createdAt: new Date(i)
                        });
                    }
                    done();
                })
            });
            it("should show only 10 blogs", function() {
                Meteor.flush();
                chai.assert.equal(10, $(".blog_title").length);
            });
            it("should show newest blog first", function() {
                Meteor.flush();
                chai.assert.equal($(".blog_title").html(), "title10");
            });
        });
    })
};