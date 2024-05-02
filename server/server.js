const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const GitHubStrategy = require('passport-github').Strategy;

const authController = require('./controllers/authController');
const searchController = require('./controllers/searchController');
const indeedController = require('./controllers/indeedController');
const shuffleController = require('./controllers/shuffleController');
const linkedinController = require('./controllers/linkedinController');


const mongoose = require('mongoose');


mongoose.connect(
  'mongodb+srv://yjdream86:kaIPgggbzhC54eIT@powerpuffs.mnq5nje.mongodb.net/?retryWrites=true&w=majority&appName=PowerPuffs'
);

mongoose.connection.once('open', () => {
  console.log('MONGO DB ---> Connected');
});

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, './../client')));

app.use(cors());


app.post('/login', authController.verifyUser, (req, res) => {
  if (res.locals.incorrect) {
    return res.status(401).json('Incorrect credentials');
  } else {
    return res.status(200).json('Success');
  }
});


app.post('/signup', authController.createUser, (req, res) => {
  // console.log("res" + res)

  // return res.status(200).sendFile(path.join(__dirname, '/search-page'));
  return res.status(200).json('');
});

// GitHub OAuth
// const CLIENT_ID = '6dae5c0c009f319f4252';
// const CLIENT_SECRET = '9ecbb3de3dcf4b8e5eb2852f310355aa190168b6';

app.get('/callbackGithub', authController.githubCredentials, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
    email: res.locals.email,
  })
});


app.post(
  '/search',
  searchController.searchZipRecruiter,
  indeedController.searchIndeed,
  linkedinController.searchLinkedin,
  shuffleController.shuffleResults,
  (req, res) => {
    console.log(
      'inside ANON SEARCH route--->',
      res.locals.zipResults[0],
      res.locals.indeedResults[0],
      res.locals.linkedinResults[0]
    );

    return res.status(200).send(res.locals.finalResults);
  }
);

app.post('/editemail', authController.updateEmail, (req, res) => {
  console.log('inside EDIT Email route');
  return res.status(200).json(res.locals.data);
});

app.post('/editpassword', authController.updatePassword, (req, res) => {
  console.log('inside EDIT Password route');
  return res.status(200).json(res.locals.data);
});

app.post(
  '/editprofile',
  authController.updatePassword,
  authController.updateEmail,
  (req, res) => {
    console.log('inside EDIT Profile route');
    return res.status(200).json(res.locals.data);
  }
);

app.post('/save', authController.updateSavedJobs, (req, res) => {
  return res.status(200).json(res.locals.data);
});

app.get('/savedjobs', authController.renderSavedJobs, (req, res) => {
  // console.log(req.params, 'request')
  console.log('inside saved jobs route');
  return res.status(200).json(res.locals.jobs);
});

app.use((req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../build/index.html'), err => {
      if (err) {
        console.log(err);
        return res.status(500).send('An error occurred');
      }
    });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Default middleware error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Look at this --> Server is running @ ${PORT}`);
});
