# solana-vanity-bot
A Node.js-based Telegram bot that generates Solana wallets with vanity addresses on-demand. Users send a command like /vanity sol in Telegram, and the bot brute-forces a wallet whose public key starts with the specified prefix. Once found, it sends the wallet details (public + private key) back via Telegram.
