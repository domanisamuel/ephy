const express = require('express');
const app = express();
const port = process.env.port || 3000;
const config = require('./config')

// bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: true }));

// connect to db
const mongoose = require('mongoose');
mongoose.connect(`${config.DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => {
    console.log('successfully connected')
})
.catch((error) => {
    console.log(error)
})

// import routes
const userRoutes = require('./routes/users')

// register routes to app
app.use('/api', userRoutes);


app.listen(port, () => {
    console.log(`ephy running on port ${port}`)
})