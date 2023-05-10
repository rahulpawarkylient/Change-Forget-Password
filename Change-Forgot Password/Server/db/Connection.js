import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.dj4wfhe.mongodb.net/COMMON-COMPONENTS?retryWrites=true&w=majority`;

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Database Connection Is Successfully");
  } catch (error) {
    console.log("Error while connecting with database", error.message);
  }
};

export default Connection;

// @ = %40  Important
