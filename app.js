const express = require('express');
const app = express();
const port = process.env.port || 3000;

// bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: true }));

// connect to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:y6bbhreN@ds263108.mlab.com:63108/kiki', { useNewUrlParser: true, useUnifiedTopology: true  })
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