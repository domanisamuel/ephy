// controller

// import user model
const User = require('../models/users');
// encrypt
const bcrypt = require('bcryptjs');
// json web tokens
const jwt = require('jsonwebtoken');

// save a user (signup)
exports.create = (req, res) => {
    // check if email exists
    User.find({email: req.body.email})
    .then(email => {
        if(email.length >= 1) {
            return res.status(400).json({ message:`Email already exists` })
        } else {
            // if cleared,
            // hash password
            bcrypt.hash(req.body.password, 10).then((hash) => {
                // get required parameters
                const user = new User({ 
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    phone:req.body.phone,
                    password: hash 
                });
                
                // save user
                user.save()
                .then(() => {
                    res.status(201)
                    res.json({ message: `user saved successfully` })
                })
                .catch((error) => {
                    res.status(400).json({ error })
                })
            })
        }
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

// (Auth) login
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => { // check whether email exists
        if(!user) {
            res.status(404).json({ message:`user not found` })
        } else {
            // compare passwords
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid) { 
                return res.status(401).json({ auth: false, message:`wrong password or email` });
            } else {
                // generate token
                const token = jwt.sign( { userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: 900 }); // expires in 15 min
                res.status(200).json({ auth:true, token: token })
            }
        }
    })
    .catch((error) => {
        res.status(404).json(error)
    })
}