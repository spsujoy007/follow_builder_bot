import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Main start menu
bot.start((ctx) => {
  ctx.reply(
    'Choose an option:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Say Hello 👋', 'say_hello')],
      [Markup.button.callback('Show Time 🕒', 'show_time')],
    ])
  );
});

// Say Hello action
bot.action('say_hello', (ctx) => {
  ctx.answerCbQuery(); // hide loading animation
  ctx.reply('Hello there! 😄');
  ctx.reply(
    'Choose:',
    Markup.keyboard([
      ['Option 1', 'Option 2', 'Option 3'],
      ['Option 4']
    ]).resize()
  );
});

// Listen to Option 1
bot.hears('Option 1', (ctx) => {
  ctx.reply('You chose Option 1 😁');
  ctx.reply(
    'Now pick more:',
    Markup.keyboard([
      ['SubOption 1A', 'SubOption 1B'],
      ['Back']
    ]).resize()
  );
});

// Show Time action
bot.action('show_time', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    `Current Time: ${new Date().toLocaleTimeString()}`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Yes ✅', 'yes'), Markup.button.callback('No ❌', 'no')],
    ])
  );
});

// Exported webhook handler for Vercel
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
    } catch (err) {
      console.error('Bot error:', err);
    }
  }
  res.status(200).send('ok');
}
