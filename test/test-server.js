const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog", function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it("should display blog posts on GET", function() {
        // get
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.at.least(1);
                const requiredKeys = ["id", "title", "content", "author", "publishDate"];
                res.body.forEach(function(item) {
                    expect(item).to.be.a("object");
                    expect(item).to.include(requiredKeys);
                });
            });
    });

    it("should post a new blog post on POST", function() {
        // post
        const newPost = { 
            title: "New Post", 
            content: "New Content", 
            author: "David S.", 
            publishedDate: "Today" 
        };
        return chai
            .request(app)
            .post("/blog-posts")
            .send(newPost)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an("object");
                expect(res.body).to.include.keys("id", "title", "content", "author", "publishedDate");
                expect(res.body.id).to.not.equal(null);
            });
    });

    it("should update a particular blog post on PUT", function() {
        // put
        const updatedBlogPost = {
            title: "Updated Post",
            content: "Better Content",
            author: "Not the last guy",
            publishedDate: "Tomorrow"
        };
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                updatedBlogPost.id = res.body[0].id;
                return chai
                    .request(app)
                    .post(`/blog-posts/${updatedBlogPost.id}`)
                    .send(updatedBlogPost)
            })
            .then(function(res) {
                expect(res).to.have.status(204)
            });
    });

    it("should delete a particular blog post on DELETE", function() {
        // DELETE
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                return chai.request(app).delete(`/blog-posts/${res.body[0].id}`)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            });
    });
});


