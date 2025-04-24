let {axios} = require("axios")


const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = 'https://follow-builder-bot.vercel.app/';

axios.get(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=${WEBHOOK_URL}`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));