const moongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await moongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "MongoDB connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
