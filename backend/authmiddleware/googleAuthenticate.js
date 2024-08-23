
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import {userdb} from '../models/userSchema.js';
import dotenv from 'dotenv';
dotenv.config();

const googleClientId=process.env.GOOGLE_CLIENT_ID;
const googleClientSecret=process.env.GOOGLE_CLIENT_SECRET


passport.use(new GoogleStrategy({
    clientID:     googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:5000/google/callback",
    scope:['email','profile'],
    passReqToCallback   : true
  },
  async(request, accessToken, refreshToken, profile, done)=>{
    console.log("profile",profile);
    try {
      let user=await userdb.findOne({googleId:profile.id});
      if(!user)
      {
        user=new userdb({
          googleId:profile.id,
          displayName:profile.displayName,
          email:profile.emails[0].value,
          image:profile.photos[0].value

        });
        await user.save();
        return done(null,user);
      }
    } catch (error) {
      return done(null,error)
    }
  }
));
passport.serializeUser((user,done)=>{
done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})