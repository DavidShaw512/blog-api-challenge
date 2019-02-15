// 'use strict';

// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const { DATABASE_URL, PORT } = require('./config');
// const { BlogPosts } = require('./models');

// const app = express();

// app.use(morgan('common'));
// app.use(express.json());

// app.get('/blog-posts', (req, res) => {
//   BlogPosts
//     .find()
//     .limit(5)
//     .then(posts => {
//       res.json(posts.map(post => post.serialize()));
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'something went terribly wrong' });
//     });
// });

// app.get('/blog-posts/:id', (req, res) => {
//   BlogPosts
//     .findById(req.params.id)
//     .then(post => res.json(post.serialize()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'something went horribly awry' });
//     });
// });

// app.post('/blog-posts', (req, res) => {
//   const requiredFields = ['title', 'content', 'author'];
//   for (let i = 0; i < requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`;
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }

//   BlogPosts
//     .create({
//       title: req.body.title,
//       content: req.body.content,
//       author: req.body.author
//     })
//     .then(blogPost => {
//         console.log(blogPost);
//         res.status(201).json(blogPost.serialize())
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Something went wrong' });
//     });

// });


// app.delete('/blog-posts/:id', (req, res) => {
//   BlogPosts
//     .findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.status(204).json({ message: 'success' });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'something went terribly wrong' });
//     });
// });


// app.put('/blog-posts/:id', (req, res) => {
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     res.status(400).json({
//       error: 'Request path id and request body id values must match'
//     });
//   }

//   const updated = {};
//   const updateableFields = ['title', 'content', 'author'];
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       updated[field] = req.body[field];
//     }
//   });

//   BlogPosts
//     .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
//     .then(updatedPost => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Something went wrong' }));
// });


// app.delete('/:id', (req, res) => {
//   BlogPosts
//     .findByIdAndRemove(req.params.id)
//     .then(() => {
//       console.log(`Deleted blog post with id \`${req.params.id}\``);
//       res.status(204).end();
//     });
// });


// app.use('*', function (req, res) {
//   res.status(404).json({ message: 'Not Found' });
// });

// // closeServer needs access to a server object, but that only
// // gets created when `runServer` runs, so we declare `server` here
// // and then assign a value to it in run
// let server;

// // this function connects to our database, then starts the server
// function runServer(databaseUrl = DATABASE_URL, port = PORT) {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(databaseUrl, err => {
//       if (err) {
//         return reject(err);
//       }
//       server = app.listen(port, () => {
//         console.log(`Your app is listening on port ${port}`);
//         resolve();
//       })
//         .on('error', err => {
//           mongoose.disconnect();
//           reject(err);
//         });
//     });
//   });
// }

// // this function closes the server, and returns a promise. we'll
// // use it in our integration tests later.
// function closeServer() {
//   return mongoose.disconnect().then(() => {
//     return new Promise((resolve, reject) => {
//       console.log('Closing server');
//       server.close(err => {
//         if (err) {
//           return reject(err);
//         }
//         resolve();
//       });
//     });
//   });
// }

// // if server.js is called directly (aka, with `node server.js`), this block
// // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
// if (require.main === module) {
//   runServer(DATABASE_URL).catch(err => console.error(err));
// }

// module.exports = { runServer, app, closeServer };


// ##################################################################
// Everything above here is copied from the sample solution,
// and everything below is original code that has been commented out.
// This is for debug purposes, un-comment when bug is discovered.
// ##################################################################
"use strict"

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { BlogPosts } = require('./models');
const { PORT, DATABASE_URL } = require('./config');
// const blogRouter = require('./blogRouter');

const app = express();

mongoose.Promise = global.Promise;

app.use(morgan("common"));
app.use(express.json());
// app.use('/blog-posts', blogRouter);

app.get('/blogPosts', (req, res) => {
    BlogPosts
        .find()
        .then(posts => {
        res.json(posts.map(post => post.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.get('/blog-posts/:id', (req, res) => {
    BlogPosts
        .findById(req.params.id)
        .then(post => res.json(post.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
})

app.post('/blog-posts', (req, res) => {
    const requiredFields = ["title", "author", "content"];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.log(message);
            console.error(message);
            return res.status(400).send(message);
        }
    }

    BlogPosts.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    })
    .then(post => res.status(201).json(post.serialize()))
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    });
});

app.put('/blog-posts:/id', (req, res) => {
    if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = "Request path id and request body id must match";
        console.error(message);
        return res.status(400).json({ message: message })
    };

    const postUpdate = {};
    const updatableFields = ['title', 'author', 'content'];

    updatableFields.forEach(field => {
        if (field in req.body) {
            postUpdate[field] = req.body[field]
        };
    });

    BlogPosts
        .findByIdAndUpdate(req.params.id, {$set: postUpdate})
        .then(updatedPost => res.status(204).end())
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
})

app.delete('/blog-posts/:id', (req, res) => {
    BlogPosts
        .findByIdAndDelete(req.params.id)
        .then(post => res.status(204).end())
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
})

app.use('*', function(req, res) {
    req.status(404).json({ message: "Not found"})
})

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }
  
  // this function closes the server, and returns a promise. we'll
  // use it in our integration tests later.
  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer }

// app.listen(process.env.PORT || 8080, () => {
//     console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
//   });