const express = require('express');
const morgan = require('morgan');

const app = express();

const blogRouter = require('./blogRouter');

app.use(morgan("common"));
app.use(express.json());

app.use('/blog-posts', blogRouter);





BlogPost.create('Blog 1', 'Sample content', 'David', 'February 3');
BlogPost.create('Blog 2', 'Sample content', 'David', 'February 4');






app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });