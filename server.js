const express = require('express');
const morgan = require('morgan');

const { BlogPosts } = require('./models');
const blogRouter = require('./blogRouter');

const app = express();


app.use(morgan("common"));
app.use(express.json());
app.use('/blog-posts', blogRouter);






BlogPosts.create('Blog 1', 'Sample content', 'David', 'February 3');
BlogPosts.create('Blog 2', 'Sample content', 'David', 'February 4');






app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });