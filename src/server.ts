import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
   await mongoose.connect(config.database_url as string);

    console.log("Database connected successfully");
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}!`);
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

main();
