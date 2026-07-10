# 🚀 EnvMaster

![CI](https://github.com/gaurav5800/envmaster/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/npm/v/@gaurav_hasija/envmaster)
![Downloads](https://img.shields.io/npm/dm/@gaurav_hasija/envmaster)
![GitHub stars](https://img.shields.io/github/stars/gaurav5800/envmaster?style=social)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node](https://img.shields.io/badge/Node.js-20+-green)

A modern **TypeScript CLI** for validating, linting, synchronizing, generating, and securing `.env` files.

---

# 🎬 Demo

![EnvMaster Demo](assets/demo.gif)

---

# ✨ Why EnvMaster?

Managing environment variables across projects can quickly become messy and error-prone.

EnvMaster helps developers by:

- 🚀 Initializing new `.env` projects
- ✅ Validating required environment variables
- 🔄 Synchronizing `.env.example`
- 🧹 Detecting duplicate and invalid variables
- 🔒 Scanning for accidentally exposed secrets
- 📦 Generating `.env.example` automatically
- 🩺 Running environment diagnostics
- ⚡ Improving developer productivity

---

# ✨ Features

- 🚀 Initialize `.env` and `.env.example`
- 🔍 Validate `.env` files
- 🔄 Synchronize `.env` with `.env.example`
- 📦 Generate `.env.example`
- 🧹 Lint common environment file issues
- 🔒 Detect exposed secrets
- 🩺 Run environment diagnostics
- ⚡ Fast TypeScript CLI
- 🧪 Unit tested using Vitest
- 🚀 GitHub Actions CI

---

# 📦 Installation

## Global

```bash
npm install -g @gaurav_hasija/envmaster
```

## Local Development

```bash
git clone https://github.com/gaurav5800/envmaster.git

cd envmaster

npm install

npm run build
```

---

# 📖 Commands

| Command | Description |
|----------|-------------|
| `envmaster --help` | Show all available commands |
| `envmaster init` | Initialize `.env` and `.env.example` |
| `envmaster init --force` | Overwrite existing environment files |
| `envmaster validate` | Validate environment variables |
| `envmaster doctor` | Run environment diagnostics |
| `envmaster generate` | Generate `.env.example` from `.env` |
| `envmaster sync` | Synchronize `.env.example` |
| `envmaster lint` | Lint `.env` for common issues |
| `envmaster secrets` | Scan for exposed secrets |

---

# 💻 Example

```bash
envmaster validate
```

Output

```text
🔍 Validating .env file...

✓ DATABASE_URL
✓ JWT_SECRET
✓ API_KEY

Validation successful.
```

---

# 📊 Why choose EnvMaster?

| Feature | EnvMaster |
|----------|:---------:|
| Validate `.env` | ✅ |
| Generate `.env.example` | ✅ |
| Detect duplicate variables | ✅ |
| Detect invalid variable names | ✅ |
| Detect exposed secrets | ✅ |
| Environment diagnostics | ✅ |
| Lint support | ✅ |
| GitHub Actions CI | ✅ |
| TypeScript | ✅ |

---

# 🛣 Roadmap

## v0.2.0

- [ ] Interactive `init`
- [ ] `lint --fix`
- [ ] Multi-environment support
- [ ] JSON output
- [ ] Better diagnostics

## v0.3.0

- [ ] VS Code Extension
- [ ] AI-powered suggestions
- [ ] Git Hooks integration
- [ ] GitHub Action integration

---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to improve EnvMaster:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

Please read **CONTRIBUTING.md** before submitting changes.

---

# ⭐ Support

If EnvMaster helps you, please consider giving the repository a ⭐ on GitHub.

It really helps the project grow.

---

# 📄 License

Licensed under the MIT License.