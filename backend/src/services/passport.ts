import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt"
import passportLocal from "passport-local"
import User from "../models/User.model"

const LocalStrategy = passportLocal.Strategy

// setting local strategy:
const localOptions = {
  usernameField: "username",
  password: "password",
}
const localLogin = new LocalStrategy(
  localOptions,
  async (username: string, password: string, done) => {
    // get user by username or email
    const user = await User.findOne({
      $or: [{ $or: [{ username }] }, { $or: [{ email: username }] }],
    })
    if (!user) {
      return done(null, false, {
        message: "Correo electrónico o Nombre de usuario incorrecto",
      })
    }
    const isMatch: boolean = await user.matchPassword(password)
    if (!isMatch) {
      return done(null, false, { message: "Contraseña incorrecta" })
    }
    return done(null, user)
  }
)

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_SECRET,
}

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload._id)
    if (user) {
      done(null, user)
    } else {
      done(null, false, { message: "Invalid token" })
    }
  } catch (error) {
    done(error, false, { message: "Server Error" })
  }
})

passport.use(jwtLogin)
passport.use(localLogin)
