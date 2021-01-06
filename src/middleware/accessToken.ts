import passport from "../config/passport";

export const accessTokenMiddleWare = passport.authenticate("jwt", {
  session: false,
});
