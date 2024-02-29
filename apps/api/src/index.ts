import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();
const port = process.env.SERVER_PORT ?? 8000;

mongoose.connect(process.env.MONGODB_URL ?? "", {});
const database = mongoose.connection;
database.on("error", console.error.bind(console, "connection error:"));
database.once("open", () => console.log("Connected to the database"));

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/api", routes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
