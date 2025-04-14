# 🔗 Solana Vanity Wallet Bot
A Node.js Telegram bot that generates Solana wallets with custom vanity prefixes on-demand. Users send a command like /vanity sol, and the bot brute-forces a wallet whose public key starts with that prefix. Once matched, the bot returns the full wallet (public + private key) directly in Telegram.

⚡ Blazing fast, stateless, no database.

🔧 Easily extendable with multithreading, job queues, or Docker.

🧪 Meant for dev/testing only — never expose real private keys in production.

🌐 [vanitysol.org](https://vanitysol.org) — project site & future tools hub.

Live bot: [@VanitySolBot](https://t.me/VanitySolBot)