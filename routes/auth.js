const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys");
const requireLogin = require('../middleware/requireLogin')




router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please all the fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "users already exist" });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassedWord) => {
        const user = new User({ email, password : hashedPassedWord, name });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/signin", (req, res) => {
    const {email,password} = req.body
    if(!email || !password) {
       return  res.status(422).json({error: "Please Provide Email or Password"})
    }
    User.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
       return  res.status(422).json({error: 'Invalid email or password'})
        }
        bcrypt.compare(password,savedUser.password).then((domatch) => {
            if(domatch) {
            const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
            res.json({token})
            }else{
                return  res.status(422).json({error: 'Invalid email or password'})
            }
        }).catch(err => {
            console.log(err)
        })
    })
})


router.get("/",(req,res)=> res.status(200).json({message:"Server is live"}))
module.exports = router;
