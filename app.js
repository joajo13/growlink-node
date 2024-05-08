require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');

//Routes
const authRoutes = require('./modules/auth/routes');
const postsRoutes = require('./modules/posts/routes');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server running on port 3001.\n http://localhost:' + port + '/');
});
