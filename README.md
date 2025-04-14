# Solana Vanity Wallet Bot
A Node.js-based Telegram bot that generates Solana wallets with vanity addresses on-demand. Users send a command like /vanity sol in Telegram, and the bot brute-forces a wallet whose public key starts with the specified prefix. Once found, it sends the wallet details (public + private key) back via Telegram.

⚡ Fast, stateless, no database.
🧠 Easily extendable with multithreading, queues, or Docker.
🔐 Meant for dev/testing use only — never expose private keys in production.
