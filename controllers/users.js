// controller

// import user model
const User = require('../models/users');

// save a user
exports.create = (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;
    const user = new User({ firstname, lastname, email, phone, password });
    user.save()
    .then(() => {
        res.status(201)
        res.json({ message: `user saved successfully` })
    })
    .catch((error) => {
        res.status(400).json({ error })
    })
}

// retrieve all users
exports.findAll = (req, res) => {
    User.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((error) => {
        res.status(400).json(error)
    })
}

// retrieve a specific user
exports.findOne = (req, res) => {
    User.findOne({ _id: req.params.id })
    .then((user) => {
        res.status(200).json(user)
    })
    .catch((error) => {
        res.status(404).json(error)
    })
}

// update a specific user
exports.update = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((user) => {
        res.status(201).json({ message: `user updated successfully`, data: user })
    })
    .catch((error) => {
        res.status(400).json(error)
    })
}

// delete a specific user
exports.delete = (req, res) => {
    User.deleteOne({ _id:req.params.id })
    .then((user) => {
        res.status(200).json({ message:`user deleted!` })
    })
    .catch((error) => {
        res.status(404).json(error)
    })
}