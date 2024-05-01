const Auth = require('../../models/AuthModel');
const bcrypt = require('bcryptjs');
const authController = {};

/**
 * createUser - create and save a nAuth into the database.
 */

authController.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === '' || password === '') {
<<<<<<< HEAD
      throw new Error('Missing fields on some markets')
     // throw {msg :'need to enter both email & password to create new user' }
=======
      throw { msg: 'need to enter both email & password to create new user' };
>>>>>>> 561c82053ab21972d177f124796f00ac4355e0a9
    }
    console.log('Email and password provided');
    const user = await Auth.create({
      email,
      password,
    });
    if (!user) {
      throw { msg: 'error creating user' };
    }
    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in authController.createUser',
      status: 500,
      message: error.msg,
    });
  }
};

/**
 * verifyUser - Obtain email and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
authController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  Auth.find({ email })
    .then(data => {
      console.log(data);
      if (!data[0]) {
        next({ error: 'Email was not found' });
      }
      // console.log("Find password: ", data[0].password, "email: ", email);
      const dbPassword = data[0].password;
      console.log(dbPassword);
      res.locals.dbId = data[0]['_id'].toString();
      console.log('dbId: ', res.locals.dbId);
      console.log('password: ', password);
      const match = bcrypt.compare(password, dbPassword).then(didMatch => {
        // console.log('match: ', didMatch);
        if (!didMatch) {
          res.locals.incorrect = true;
        } else {
          res.locals.user = data;
        }
        return next();
      });
    })
    .catch(err => {
      return next({
        log: 'Express error handler caught error in authController.verifyUser',
        status: 500,
        message: { err },
      });
    });
};

authController.updateEmail = (req, res, next) => {
  const { email, newEmail } = res.locals.body;
  console.log(email, newEmail);
  if (newEmail !== '') {
    Auth.updateOne({ email }, { $set: { email: newEmail } })
      .then(data => {
        console.log('test');
        console.log(data);
        res.locals.data = data;
        return next();
      })
      .catch(err => {
        return next({
          log: 'Express error handler caught error in authController.updateEmail',
          status: 500,
          message: { err },
        });
      });
  } else {
    console.log('Did not update email');
    return next();
  }
};

authController.updatePassword = (req, res, next) => {
  const { email, newPassword } = req.body;
  res.locals.body = req.body;
  if (newPassword !== '') {
    let bcryptPassword;
    async function hashPassword() {
      try {
        console.log('new password: ', newPassword);
        const salt = await bcrypt.genSalt(10);
        bcryptPassword = await bcrypt.hash(newPassword, salt);
        console.log('bcrypt password: ', bcryptPassword);
        Auth.updateOne({ email }, { $set: { password: bcryptPassword } })
          .then(data => {
            res.locals.data = data;
            return next();
          })
          .catch(err => {
            return next({
              log: 'Express error handler caught error in authController.updatePassword',
              status: 500,
              message: { err },
            });
          });
      } catch (err) {
        return next(err);
      }
    }
    hashPassword();
  } else {
    console.log('Did not update password');
    return next();
  }
};
authController.updateSavedJobs = async (req, res, next) => {
  console.log('inside SAVE route!!!!!', req.body);
  const { email } = req.body;
  Auth.findOneAndUpdate(
    { email: '234' },
    { $push: { savedJobs: req.body } },
    next()
  ).catch(err => {
    return next({
      log: 'Express error handler caught error in authController.updateSavedJobs',
      status: 500,
      message: { err },
    });
  });
};
authController.renderSavedJobs = (req, res, next) => {
  const { email } = req.body;
  console.log('inside render saved jobs ', email);
  Auth.find({ email: '234' })
    .then(data => {
      res.json(data[0].savedJobs);
      console.log('data from database');
      console.log(data[0].savedJobs);
    })
    .catch(err => res.json(err));
};

module.exports = authController;
