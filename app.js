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

// models
const userSchema = mongoose.Schema({
    username: { type:String, required: true},
    email: { type:String, required: true, unique:true },
    phone: { type:String, required: true },
    auth_date: { type:Date, default: Date.now }
})
const User = mongoose.model(`User`, userSchema)

// controllers and routes


// save a user
app.post(`/api/users/`, (req, res) => {
    const { username, email, phone } = req.body;
    const user = new User({ username, email, phone });
    user.save()
    .then(() => {
        res.status(201)
        res.json({ message: `user saved successfully` })
    })
    .catch((error) => {
        res.status(400).json({ error })
    })
})

// retrieve all users
app.get(`/api/users/`, (req, res) => {
    User.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((error) => {
        res.status(400).json(error)
    })
})

// retrieve a specific user
app.get(`/api/users/:id`, (req, res) => {
    User.findOne({ _id: req.params.id })
    .then((user) => {
        res.status(200).json(user)
    })
    .catch((error) => {
        res.status(404).json(error)
    })
})

// update a specific user
app.put(`/api/users/:id`, (req, res) => {
    const id = req.params.id;
    const { username, email, phone } = req.body;
    const user = new User({ id, username, email, phone });
    user.updateOne({ _id:id }, user)
    .then((user) => {
        res.status(201).json({ message: `user updated successfully`, data: user })
    })
    .catch((error) => {
        res.status(400).json(error)
    })
})

// delete a specific user
app.delete(`/api/users/:id`, (req, res) => {
    User.deleteOne({ _id:req.params.id })
    .then((user) => {
        res.status(200).json({ message:`user deleted!` })
    })
    .catch((error) => {
        res.status(404).json(error)
    })
})


app.listen(port, () => {
    console.log(`ephy running on port ${port}`)
})