import express from "express";
import "dotenv/config.js";
import morgan from "morgan";
import router from "./routes/contactRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import connnectDB from "./config/databaseConfig.js";
import auth from "./routes/userRoute.js";

connnectDB();

const PORT = process.env.SERVER_PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/api/auth", auth);
app.use("/api/contact", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Application start on port: ", PORT);
});
