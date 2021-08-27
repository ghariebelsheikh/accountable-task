import config from "config";
import express from "express";
import cors from "./startup/cors";
import routes from "./startup/routes";
import db from "./startup/db";
import amqp from "./startup/amqp";
import "./startup/cron";

const app = express();

cors(app);

routes(app);

db();

amqp();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

export default server;
