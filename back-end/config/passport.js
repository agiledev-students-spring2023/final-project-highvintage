const User = require('../schemas/users.js');
const bcrypt = require("bcryptjs");
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: "username", passwordField: "password"},(username, password, done) => {
            User.findOne({username: username}).then(function(err,user){
              try {  
                
                if(!user) return done(null,false)
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                })
            } catch {
                throw err
            }
            })
            
        })
    )

    passport.serializeUser((user,cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id,cb) => {
        User.findOne({_id: id}, (err,user) => {
            const userInformation = {
                username: user.username,
            };
            cb(err, userInformation);
        })
    })

}