import passport from "passport";
import passportJWT from "passport-jwt";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_KEY,
};

interface Payload {
  id?: string,
  role?: string
}

const strategy = new JwtStrategy(opts, (payload, next) => {
  const { id, role }: Payload = payload;
  const user = { id, role };
  next(null, user);
});

passport.use(strategy);

export default passport;
