const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
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



// app.post('/auth/github/callback', async (req, res) => {
//   const { code } = req.body;

//   const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       code,
//     }),
//   });

//   const tokenData = await tokenResponse.json();
//   const accessToken = tokenData.access_token;

//   if (accessToken) {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });


// using passport library for Github OAuth

// passport.use(new GitHubStrategy({
//   clientID: '6dae5c0c009f319f4252',
//   clientSecret: '9ecbb3de3dcf4b8e5eb2852f310355aa190168b6',
//   callbackURL: 'http://localhost:8080/auth/github/callback'
// },
// function(acessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// app.use(passport.initialize());

// app.get('/auth/github', 
//   passport.authenticate('github'));

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('http://localhost:8080');
//   });

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
