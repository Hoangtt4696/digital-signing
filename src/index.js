import config from 'ds-config';
import mongoose from 'mongoose';
import app from './server';

const { db: dbConfig, nodeEnv, port } = config;

const server = app.listen(port, async () => {
  await mongoose.connect(`${dbConfig.MONGO_URL}/${dbConfig.DATABASE}`).then(() => {
    console.log('Mongodb connected !');
  });

  console.log(`Running at ${nodeEnv} mode`);
  console.log(`Server started at http://127.0.0.1:${port}`);
});

const unexpectedErrorHandler = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Uncaught Exception
process.on('uncaughtException', (exception) => {
  console.log(`UNCAUGHT EXCEPTION: ${exception.stack}`);

  unexpectedErrorHandler();
});

// Unhandled Rejection
process.on('unhandledRejection', (reason) => {
  console.log(`UNHANDLED REJECTION: ${reason}`);

  unexpectedErrorHandler();
});
