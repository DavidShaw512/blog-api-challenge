// "use strict"

// const express = require('express');
// const router = express.Router();

// const { BlogPosts } = require('./models');

// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();


// BlogPosts.create('Blog 1', 'Sample content', 'David', 'February 3');
// BlogPosts.create('Blog 2', 'Sample content', 'David', 'February 4');


// router.get('/', (req, res) => {
//     res.json(BlogPosts.get());
// });

// function validationMiddleware(requiredFields) {
//     return function(req, res, next) {
//         for (let i=0; i<requiredFields.length; i++) {
//             const field = requiredFields[i];
//             if (!(field in req.body)) {
//                 const message = `Missing \`${field}\` in request body`
//                 console.error(message);
//                 return res.status(400).send(message);
//             }
//         };
//     next();
//     }
// }

// router.post('/', 
//     jsonParser, 
//     validationMiddleware(['title', 'content', 'author', 'publishDate']), 
//     (req, res) => {
//         const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
//         res.status(201).json(item);
// });

// router.put('/:id', jsonParser, (req, res) => {
//     const requiredFields = ['title', 'content', 'author', 'publishDate'];
//     for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//         if (!(field in req.body)) {
//         const message = `Missing \`${field}\` in request body`
//         console.error(message);
//         return res.status(400).send(message);
//         }
//     }

//     if (req.params.id !== req.body.id) {
//         const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
//         console.error(message);
//         return res.status(400).send(message);
//     }

//     console.log(`Updating blog post \`${req.params.id}\``);
//     BlogPosts.update({
//         id: req.params.id,
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author,
//         publishDate: req.body.publishDate
//     });
//     res.status(204).end();
// })

// router.delete('/:id', (req, res) => {
//     BlogPosts.delete(req.params.id);
//     console.log(`Deleted blog post \`${req.params.ID}\``);
//     res.status(204).end();
// })

// module.exports = router;