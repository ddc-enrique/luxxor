const passport = require('passport')
const jwtStrategy  = require('passport-jwt').Strategy 
const extractJwt =require('passport-jwt').ExtractJwt
const User = require('../models/User')

module.exports= passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.SECRETORKEY
}, ( payload, done)=>{
    User.findOne({_id: payload._doc._id})
    .then(res=>{
        if(!res){
           return done(null,false)
        }else{
            return done(null,res)
        }
    })
    .catch(error=> done(error,false))
}))