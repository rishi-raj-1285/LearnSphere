const mongoose = require('mongoose');

let isConnected = false;

async function connectDB(uri) {
  if (isConnected) {
    return mongoose.connection;
  }

  mongoose.set('strictQuery', true);
  // Fail fast when Atlas is unreachable instead of leaving API requests queued.
  mongoose.set('bufferCommands', false);

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  isConnected = true;

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
  });

  return mongoose.connection;
}

function getMongoConnectionState() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState;
}

function isMongoConnected() {
  return getMongoConnectionState() === 1;
}

module.exports = {
  connectDB,
  getMongoConnectionState,
  isMongoConnected
};
