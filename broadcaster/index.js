const { connect, StringCodec } = require("nats");
const axios = require("axios");
require("dotenv").config();

const NATS_URL = process.env.NATS_URL;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const sc = StringCodec();

(async () => {
  const nc = await connect({ servers: NATS_URL });
  console.log("Broadcaster connected to NATS");

  const sub = nc.subscribe("todos.events");

  for await (const msg of sub) {
    const payload = JSON.parse(sc.decode(msg.data));

    const telegramPayload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: `👤 ${payload.user}\n📝 ${payload.message}`,
    };

    try {
      await axios.post(TELEGRAM_API, telegramPayload);
      console.log("Sent to Telegram:", telegramPayload.text);
    } catch (err) {
      console.error("Telegram send failed:", err.message);
    }
  }
})();
