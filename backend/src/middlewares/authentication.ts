import passport from "passport"

// Require user auth
export const requireAuth = passport.authenticate("jwt", { session: false })
export const requireLogin = passport.authenticate("local", { session: false })
