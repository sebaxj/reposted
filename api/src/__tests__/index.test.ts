// import packages
import supertest from 'supertest';
import mongoose from 'mongoose';

// instance of expresss app
import { app } from '../app';
const request: any = supertest(app);

// set timeout
jest.setTimeout(10000);

// Connect to Mongoose
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_CONN_URL as string, {
    connectTimeoutMS: 3000, // connection timeout of 3 seconds
  });
});

// Base Case
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

// Disconnect Mongoose - allows Jest to exit successfully.
// Because it is "awaiting" the mongoose.connect() call still
afterEach(async () => {
  await mongoose.connection.close();
});
