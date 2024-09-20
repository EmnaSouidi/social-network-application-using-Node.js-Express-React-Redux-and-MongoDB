const express= require ('express');

const mongoose = require('mongoose');


const users =require('./routes/api/users');
const profile =require('./routes/api/profile');
const posts =require('./routes/api/posts');


// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db)
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app= express();

app.get('/', (req,res)=> res.send('Hello World'));

//use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

// app.listen(3000, ()=> console.log('Server is running on port 3000'));

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`server is running on ${port}`));