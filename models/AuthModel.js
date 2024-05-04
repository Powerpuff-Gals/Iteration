const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedJobs: {
    type: Array,
  },
});

authSchema.pre('save', async function (next) {
  try {
    console.log('old password: ', this.password);
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('new password: ', this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

const Auth = mongoose.model('auth', authSchema); 

// savedjob schema using ref. email in auth model
const githubSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  savedJobs : {
    type : Array
  }
});

const Github = mongoose.model('github', githubSchema); 

module.exports = {
  Auth,
  Github
};
