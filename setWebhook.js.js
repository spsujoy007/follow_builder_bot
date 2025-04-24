let axios = require("axios")
require("dotenv").config()

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = 'https://follow-builder-bot.vercel.app/api/bot';

axios.get(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=${WEBHOOK_URL}`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));