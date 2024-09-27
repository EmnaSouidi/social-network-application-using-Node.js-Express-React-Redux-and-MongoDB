const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile Model
const Profile = require('../../models/Profile');

//@route GET api/profile/test
//@desc Tests profile route
//access Public

router.get('/test', (req,res)=>res.json({msg:'profile works'}));



module.exports = router;