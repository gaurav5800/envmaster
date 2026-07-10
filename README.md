# 🚀 EnvMaster

![CI](https://github.com/gaurav5800/envmaster/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/npm/v/@gaurav_hasija/envmaster)
![Downloads](https://img.shields.io/npm/dm/@gaurav_hasija/envmaster)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node](https://img.shields.io/badge/Node.js-20+-green)
![GitHub stars](https://img.shields.io/github/stars/gaurav5800/envmaster?style=social)

A modern TypeScript CLI for validating, linting, synchronizing, generating, and securing `.env` files.

---

## ✨ Features

- 🚀 Initialize a new project with `.env` and `.env.example`
- 🔍 Validate `.env` files
- 🔄 Synchronize `.env.example`
- 🧹 Lint common environment file issues
- 🔒 Detect accidentally committed secrets
- 📦 Generate `.env.example`
- 🩺 Run environment diagnostics
- ⚡ Built with TypeScript
- 🧪 Unit tested using Vitest
- 🚀 GitHub Actions CI

---

## 📦 Installation

## npm

https://www.npmjs.com/package/@gaurav_hasija/envmaster

### Global

```bash
npm install -g @gaurav_hasija/envmaster
```

### Local

```bash
npm install
npm run build
```

---

## Commands

| Command | Description |
|---------|-------------|
| envmaster init | Initialize .env |
| envmaster validate | Validate .env |
| envmaster lint | Lint environment file |
| envmaster sync | Sync .env.example |
| envmaster generate | Generate .env.example |
| envmaster doctor | Diagnose issues |
| envmaster secrets | Detect secrets |

---

## 💻 Example

```bash
envmaster validate

🔍 Validating .env file...

✓ DATABASE_URL
✓ JWT_SECRET
✗ API_KEY is empty

Validation failed.
```

---

## 🛣 Roadmap

- [x] Init command
- [x] Validate command
- [x] Doctor command
- [x] Sync command
- [x] Generate command
- [x] Secrets detection
- [x] Lint command
- [ ] Auto Fix (`lint --fix`)
- [ ] Multi-environment support
- [ ] Interactive initialization
- [ ] npm Package Release

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome.

Fork the repository and submit a Pull Request.

---

## 🎬 Demo

![EnvMaster Demo](assets/demo.gif)


## 📄 License

MIT License