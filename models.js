// 'use strict';

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const blogPostSchema = mongoose.Schema({
//   author: {
//     firstName: String,
//     lastName: String
//   },
//   title: {type: String, required: true},
//   content: {type: String},
//   created: {type: Date, default: Date.now}
// });


// blogPostSchema.virtual('authorName').get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim();
// });

// blogPostSchema.methods.serialize = function() {
//   return {
//     id: this._id,
//     author: this.authorName,
//     content: this.content,
//     title: this.title,
//     created: this.created
//   };
// };

// const BlogPosts = mongoose.model('BlogPosts', blogPostSchema);

// module.exports = {BlogPosts};

// ##################################################################
// Everything above here is copied from the sample solution,
// and everything below is original code that has been commented out.
// This is for debug purposes, un-comment when bug is discovered.
// ##################################################################

"use strict"

// const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// This module provides volatile storage, using a `BlogPost`
// model. We haven't learned about databases yet, so for now
// we're using in-memory storage. This means each time the app stops, our storage
// gets erased.

// Don't worry too much about how BlogPost is implemented.
// Our concern in this example is with how the API layer
// is implemented, and getting it to use an existing model.


// function StorageException(message) {
//    this.message = message;
//    this.name = "StorageException";
// }

// ############ Author Schema ##############

const authorSchema = mongoose.Schema({
    firstName: 'string',
    lastName: 'string',
    userName: {
        type: 'string',
        unique: true
    }
});

const commentSchema = mongoose.Schema({ content: 'string' });

const blogPostSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    author: {
        // firstName: String,
        // lastName: String
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors'
    },
    content: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});

blogPostSchema.virtual("authorString").get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
    return {
        _id: this._id,
        title: this.title,
        author: this.author,
        content: this.content
    };
}

const Authors = mongoose.model("Authors", authorSchema)
const BlogPosts = mongoose.model("BlogPosts", blogPostSchema);

module.exports = { BlogPosts, Authors }

// const BlogPosts = {
//   create: function(title, content, author, publishDate) {
//     const post = {
//       id: uuid.v4(),
//       title: title,
//       content: content,
//       author: author,
//       publishDate: publishDate || Date.now()
//     };
//     this.posts.push(post);
//     return post;
//   },
//   get: function(id=null) {
//     // if id passed in, retrieve single post,
//     // otherwise send all posts.
//     if (id !== null) {
//       return this.posts.find(post => post.id === id);
//     }
//     // return posts sorted (descending) by
//     // publish date
//     return this.posts.sort(function(a, b) {
//       return b.publishDate - a.publishDate
//     });
//   },
//   delete: function(id) {
//     const postIndex = this.posts.findIndex(
//       post => post.id === id);
//     if (postIndex > -1) {
//       this.posts.splice(postIndex, 1);
//     }
//   },
//   update: function(updatedPost) {
//     const {id} = updatedPost;
//     const postIndex = this.posts.findIndex(
//       post => post.id === updatedPost.id);
//     if (postIndex === -1) {
//       throw new StorageException(
//         `Can't update item \`${id}\` because doesn't exist.`)
//     }
//     this.posts[postIndex] = Object.assign(
//       this.posts[postIndex], updatedPost);
//     return this.posts[postIndex];
//   }
// };

// function createBlogPostsModel() {
//   const storage = Object.create(BlogPosts);
//   storage.posts = [];
//   return storage;
// }


// module.exports = {BlogPosts: createBlogPostsModel()};