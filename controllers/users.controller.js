const { createUser } = require('../queries/users.queries');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join( __dirname, '../public/images/avatars'))
  },
  filename: (req, file, cb) => {
    cb(null, `${ Date.now() }-${ file.originalname }`);
  }
}) });

const util = require('util');


exports.signupForm = (req, res, next) => {
  res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/');
  } catch(e) {
    res.render('users/user-form', { errors: [ e.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
}

exports.uploadImage = [ 
  upload.single('avatar'),
  async (req, res, next) => {
    // console.log(
    //   util.inspect(req, {
    //     compact: false,
    //     depth: 5,
    //     breakLength: 80,
    //     color: true,
    //   })
    // );
    //res.end();
    try {
      const user = req.user;
      user.avatar = `/images/avatars/${ req.file.filename }`;
      console.log(user);
      await user.save();
      res.redirect('/');
    } catch(e) {
      next(e);
    }
  }
]