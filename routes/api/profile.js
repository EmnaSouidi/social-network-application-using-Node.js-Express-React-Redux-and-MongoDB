const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile Model
const Profile = require('../../models/Profile');
//load User model
const user = require('../../models/User');


//@route GET api/profile/test
//@desc Tests profile route
//access Public

router.get('/test', (req,res)=>res.json({msg:'profile works'}));


//@route GET api/profile/test
//@desc GET current users profile
//access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    req.user.id
});


module.exports = router;