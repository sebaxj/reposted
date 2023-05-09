// import packages
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { MongooseError } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helment from 'helmet';
import hpp from 'hpp';
import morganMiddleware from './middleware/morgan.middleware';
import { Logger } from './utils/logger';
import { MONGO_CONN_TIMEOUT } from './utils/constants';
import indexRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

dotenv.config();

// Express instance: 'app'
export const app = express();

// body parser to parse requests and responses
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '4mb' }));
// parse requests of content-type - application/json
app.use(express.json({ limit: '1kb' }));

// use cookie-parser to parse cookies
app.use(cookieParser());

// secure HTTP headers
app.use(helment());

// prevent HTTP parameter pollution
app.use(hpp());

// use morgan to log requests
app.use(morganMiddleware);

// reduce fingerprinting
app.disable('x-powered-by');

// cors options and initialization
// origin: true allows all origins
// credentials: true allows cookies to be sent
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// send fetch requests to the router
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// create mongoose connection to MongoDB
Logger.info(
  `Connecting to MongoDB at: mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`,
);
mongoose
  .connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`,
    {
      connectTimeoutMS: MONGO_CONN_TIMEOUT, // timeout after 3 seconds
    },
  )
  .then(() => {
    // check for successful connection to db
    Logger.info('Database connected.');
  })
  .catch((err: MongooseError) => {
    Logger.error('Cannot connect to the database!', err);
    process.exit();
  });
