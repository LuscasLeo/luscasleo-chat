import express from "express";
import dotenv from "dotenv";
import { join, resolve } from "path";

dotenv.config();

const { API_PORT } = process.env;

async function init() {
  console.log("INITIALIING EXPRESS SERVER V1.1");
  const app = express();
  // app.use("/", express.static(join(__dirname, "..", "..", "web-app", "dist")));
  app.use(express.json());

  app.use("/", (req, res) => {
    console.log("Received message from client!");
    res.json({
      message: "Hello World!",
      request_headers: { ...req.headers },
    });
  });

  app.listen(Number(API_PORT), () =>
    console.log(`API SERVER LISTENING TO PORT ${API_PORT}`)
  );
}

init().catch(console.error);
