const app = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserPerEmail, findUserPerId } = require('../queries/users.queries');

app.use(passport.initialize());
app.use(passport.session());

// after authentication, store _id in session
passport.serializeUser((user, done) => {
  done(null, user._id);
})

// in each request, express-session check the session _id in cookie & execute this
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserPerId(id);
    done(null, user); // user is now available in req.user
  } catch(e) {
    done(e);
  }
})

// strategy to authenticate
passport.use('local', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        done(null, user);
      } else {
        done(null, false, { message: 'Wrong password' });
      }
    } else {
      done(null, false, { message: 'User not found'});
    }
  } catch(e) {
    done(e);
  }
}))

