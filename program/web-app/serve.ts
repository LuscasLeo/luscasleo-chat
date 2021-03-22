require("dotenv").config();
import express from "express";

const { APP_PORT } = process.env;

async function init() {
  console.log("INITIALIZING WEB APP SERVER V2.1");
  const app = express();

  app.use(express.json());
  app.use(express.static(__dirname + "/dist"));
  // app.get("/", (req, res) => res.send("Hello!"));

  console.log(`[START] WEB APP SERVER TO PORT ${APP_PORT}`);
  app.listen(Number(APP_PORT), () =>
    console.log(`WEB APP SERVER LISTENING TO PORT ${APP_PORT}`)
  );
}

init().catch(console.error);
