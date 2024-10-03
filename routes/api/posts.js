const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');
//validation
const validatePostInput= require('../../validation/post');

//@route GET api/posts/test
//@desc GET post route
//@access Public
router.get('/test', (req,res)=>res.json({msg:'posts works'}));

//@route GET api/posts
//@desc GET post
//@access Public
router.get('/', (req, res)=>{
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err =>
        res.status(404).json({nopostsfound: "No posts found"}));

});
//@route GET api/posts/id
//@desc GET post by id
//@access Public
router.get('/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>res.status(404).json({nopostfound:"No post found with that ID"}));

});



//@route POST api/posts
//@desc create post
//@access Private

router.post(
    '/',
     passport.authenticate('jwt', {session : false}), 
    (req, res) =>{
    console.log(req.user);
    const { errors, isValid }= validatePostInput(req.body);

    //check validation
    if (!isValid) {
    // if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const newPost= new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
         
    });
    newPost.save().then(post => res.json(post));
}
);

// @route DELETE api/posts/:id
// @desc Delete post 
// @access Private 
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    
    Profile.findOne({user: req.user.id})
      .then(profile =>{
        Post.findById(req.params.id)
            .then(post =>{
             //check for post owner
             if(post.user.toString() !== req.user.id) {
                return res.status(401).json({notauthorized: 'User not authorized'});
        }
    
    

        //Delete 
        //la fonction remove() n'existe pas 
        //deleteOne() fonctionne
        post.deleteOne().then(()=> res.json({success: true}));
    })
    // .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    .catch(err=>{
        console.error(err);
        return res.status(404).json({servererror: 'No post found'});
    })
    
})
});
module.exports = router;