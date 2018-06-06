var mongoose = require('mongoose');
var bcrypt = require('bcrypt');



var UserSchema = new mongoose.Schema({
     username: {
         type: String,
         unique: true,
         required: true,
         trim: true
     },
     password: {
         type: String,
         required: true,
     },
     passwordConf: {
         type: String,
         required: true,
     }
 });


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//authenticate input against database
UserSchema.statics.getAuthenticated  = function (username, password, callback) {
  this.findOne({ username: username })
    .exec(function (err, user) {
    // /if error
      if (err) {
        return callback(err)
      } else if (!user) {
        // if user does not exist
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
//         if login works
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}


//hashing a password before saving it to the database
UserSchema.pre('validate', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      console.log('boo');
      return next(err);
    }
    user.password = hash;
    user.passwordConf = hash;
    next();
  })
});




var User = mongoose.model('User', UserSchema);



module.exports = User;
// module.exports = mongoose.model('polls', pollsSchema);