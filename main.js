const solanaWeb3 = require('@solana/web3.js');
const TelegramBot = require('node-telegram-bot-api');

// === Config ===
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Optional: use to restrict access
const CASE_SENSITIVE = false;

// === Init Telegram Bot ===
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

function matchesPrefix(pubKeyStr, prefix) {
  const compare = CASE_SENSITIVE ? pubKeyStr : pubKeyStr.toLowerCase();
  return compare.startsWith(prefix.toLowerCase());
}

function generateVanityWallet(prefix) {
  let tries = 0;
  while (true) {
    const keypair = solanaWeb3.Keypair.generate();
    const pubkeyStr = keypair.publicKey.toString();
    tries++;

    if (matchesPrefix(pubkeyStr, prefix)) {
      return {
        pubkey: pubkeyStr,
        secretKey: Buffer.from(keypair.secretKey).toString('hex'),
        tries,
      };
    }

    // Optional: debug log every N attempts
    if (tries % 10000 === 0) {
      console.log(`[${prefix}] ${tries} attempts so far...`);
    }
  }
}

// === Telegram Command Handler ===
bot.onText(/^\/vanity\s+([a-zA-Z0-9]+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prefix = match[1];

  // Optional: restrict access to a specific chat/user
  if (TELEGRAM_CHAT_ID && chatId.toString() !== TELEGRAM_CHAT_ID.toString()) {
    bot.sendMessage(chatId, "⛔ Unauthorized.");
    return;
  }

  console.log(`🧵 Vanity generation requested for prefix: ${prefix} by ${chatId}`);
  await bot.sendMessage(chatId, `🔍 Generating Solana address with prefix: \`${prefix}\`...\nThis may take a while.`, {
    parse_mode: 'Markdown',
  });

  try {
    const result = generateVanityWallet(prefix);

    const message = `
🎯 *Vanity Wallet Found!*
Prefix: \`${prefix}\`
Public Key: \`${result.pubkey}\`
Secret Key: \`${result.secretKey}\`
Attempts: \`${result.tries}\`
    `;

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    console.log(`✅ Sent wallet to chat ${chatId}`);
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "❌ Error during generation.");
  }
});
