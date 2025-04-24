const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Main start menu
bot.start( async(ctx) => {
  await ctx.reply(
    'Choose an option:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Say Hello 👋', 'say_hello')],
      [Markup.button.callback('Show Time 🕒', 'show_time')],
    ])
  );
});

// Say Hello action
bot.action('say_hello', async(ctx) => {
  await ctx.answerCbQuery(); // hide loading animation
  await ctx.reply('Hello there! 😄');
  await ctx.reply(
    'Choose:',
    Markup.keyboard([
      ['Option 1', 'Option 2', 'Option 3'],
      ['Option 4']
    ]).resize()
  );
});

// Listen to Option 1
bot.hears('Option 1', async(ctx) => {
  await ctx.reply('You chose Option 1 😁');
  await ctx.reply(
    'Now pick more:',
    Markup.keyboard([
      ['SubOption 1A', 'SubOption 1B'],
      ['Back']
    ]).resize()
  );
});

// Show Time action
bot.action('show_time', async(ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
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

// bot.launch()