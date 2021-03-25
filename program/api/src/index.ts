import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import log4js from "log4js";
import request from "superagent";
import ChatRoom from "./chat";
import { crypt, decode } from "./encryption/jwt";
import stringCodec from "./socket/codecs/stringCodec";
import { createServer } from "./socket/server";
import { GithubProfile } from "./types/github";
dotenv.config();

log4js.configure({
  appenders: {
    "Main Class": {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%p] %d{hh:mm:ss} [%c]%] %m",
      },
    },
  },
  categories: { default: { appenders: ["Main Class"], level: "debug" } },
});

const logger = log4js.getLogger("Main Class");
logger.level = "debug";

const { API_PORT, WS_PORT, GITHUB_API_SECRET, GITHUB_API_CLIENT } = process.env;

async function init() {
  //WebSocket Server Setup
  logger.info("INITIALIZING WEBSOCKET SERVER V1.1");
  const server = await createServer(
    {
      port: Number(WS_PORT),
    },
    stringCodec
  );

  const chat = new ChatRoom(server);

  logger.info(`Websocket Server listening to port ${WS_PORT}`);

  console.log("INITIALIZING EXPRESS SERVER V1.1");
  const app = express();

  //USE LIBS
  app.use(express.json());
  app.use(cors());

  //ROUTES
  app.get("/messages", (req, res) => {
    res.json({ messages: chat.messages });
  });

  app.get("/signin/github/:code", async (req, res) => {
    try {
      if (!req.params.code)
        return res.status(400).json({ message: "no code provided" });
      const { code } = req.params;
      logger.debug(`Getting access token for code ${code}`);
      const authData = await request
        .post("https://github.com/login/oauth/access_token")
        .send({
          code,
          client_id: GITHUB_API_CLIENT,
          client_secret: GITHUB_API_SECRET,
        })
        .set("Accept", "application/json");

      const { access_token, scope, token_type } = authData.body as {
        access_token: string;
        scope: string;
        token_type: string;
      };
      logger.debug(`Token: ${access_token}`);

      const response = await request
        .get("https://api.github.com/user")
        .send()
        .set("Authorization", `token ${access_token}`)
        .set("User-Agent", req.get("User-Agent"));

      const { name } = response.body as GithubProfile;

      res.json({
        token: crypt({
          username: name,
        }),
      });
    } catch (err) {
      res.json({ message: "Error", err });
    }
  });

  app.post("/sign/validate", (req, res) => {
    if (!req.body.token) return res.status(403).send();

    const { token } = req.body;
    try {
      const valid = decode(token);
      return res.json(valid);
    } catch {
      return res.status(403).send();
    }
  });

  //LISTEN
  app.listen(Number(API_PORT), () =>
    console.log(`API SERVER LISTENING TO PORT ${API_PORT}`)
  );
}

init().catch((reason) => {
  logger.error("Error when initializing app: ", reason);
  process.exit(1);
});
