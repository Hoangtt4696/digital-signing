import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportStrategy from 'infrastructure/passport';
import routes from 'routes/router';
import errorConverter from 'utils/rest-error';
import handleError from 'utils/handle-error';
import config from 'ds-config';

const { authProviders } = config;

/**
 * Express instance
 * @public
 */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// authentiation
app.use(passport.initialize());
passport.use(authProviders.jwt, passportStrategy.jwtStrategy);

app.use('/api/v1', routes);
app.use((req, res, next) => {
  return next(errorConverter(404, 'Not found'));
});

app.use(handleError);

export default app;
