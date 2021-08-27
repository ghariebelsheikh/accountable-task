import config from "config";
import mongoose from "mongoose";

export default async function () {
  const db: string = config.get("db");
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  try {
    await mongoose.connect(db, options);
    console.log(`Connected to Database successfully`);
  } catch (error) {
    console.log("Error Connecting to Database");
  }
}
