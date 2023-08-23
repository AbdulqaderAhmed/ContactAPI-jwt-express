import mongoose from "mongoose";

const connnectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/ContactAPI"
    );

    if (!connect) {
      throw new Error("Connection failed!");
    }

    console.log(
      `Connection established ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connnectDB;
