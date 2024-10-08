const express= require('express');
const router = express.Router();
const gravatar= require('gravatar');
const bcrypt= require('bcryptjs');
const JWT= require('jsonwebtoken');
const keys= require('../../config/keys');
const passport = require('passport');

//load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// load User model
const User = require('../../models/User')

router.get('/test', (req,res)=>res.json({msg:'user works'}));


router.post('/register',(req,res)=> {
    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if(!isValid){
        return res.status(404).json(errors);
    }


    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            errors.email ='Email already Exist';
            return res.status(400).json(errors);
        }else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',   //size
                r: 'pg',   //Rating
                d: 'mm'   //Default
            })
            const newUser = new User({
                name: req.body.name,
                email:req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err));
                })
            })

        }
    })
})
// @route POST api/users/login
// @desc Login user / returing JWT Token
//@access Public 

router.post ('/login', (req, res) => {
    const {errors,isValid}= validateLoginInput(req.body);

    const email= req.body.email;
    const password= req.body.password;
    //find user by email
    User.findOne({email})
    .then(user=>{
        //check from user
        if(!user){
            errors.email='User not found';
            return res.status(404).json(errors);
    }
        //check password
        bcrypt.compare(password, user.password)
       .then(isMatch=>{
        if(isMatch){
            //User matched
            //res.json({msg:'Success'});
            const payload={id:user,name:user.name,avatar:user.avatar} //creat JWT payload
            //sign token
            JWT.sign(payload,keys.secretOrKey,{expiresIn: 3600},
                (err, token)=>{
                    res.json({
                        success: true,
                        token: 'Bearer '+ token
                       
                    })
                    
                }
            )
        }else{
            errors.password='password incorrect';
            return res.status(404).json(errors);
        }
       
    });
});

});

// @route GET api/users/current
// @desc Rutern current user
//@access Private

router.get('/current',
     passport.authenticate('jwt', {session:false}),
     (req, res)=>{
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,

    });
});
module.exports = router;