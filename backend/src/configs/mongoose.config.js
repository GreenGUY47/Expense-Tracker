import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const dbInst = await mongoose.connect(`${process.env.MONGOOSE_URL}/${process.env.DB_NAME}`);
    console.log(`MongoDB Connected: ${dbInst.connection.host}/${dbInst.connection.name}`);
  } catch (err) {
    console.log(`Mongoose failed to connect ${err.message}`);
    throw err;
  }
};

export default connectToDb;
