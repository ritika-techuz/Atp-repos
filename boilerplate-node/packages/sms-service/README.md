# 💬 @repo/sms-service

A modular and provider-based SMS service package for sending messages using Twilio or custom implementations. Designed for backend services in a monorepo setup.

---

## 📁 Folder Structure

```
📦 sms-service/
├── 📁 .turbo/              # Turborepo cache
├── 📁 dist/                # Compiled output
├── 📁 node_modules/        # Dependencies
├── 📁 src/                 # src directory
│ ├── 📁 tests/             # Unit tests
│ ├── 📁 providers/         # SMS provider implementations
│ │ ├── noop.ts             # No-operation provider for testing/dev
│ │ └── twillio.ts          # Twilio integration
│ ├── 📄 index.ts           # Entrypoint exports
│ ├── 📄 types.ts           # Shared TypeScript types/interfaces
├── 📄 eslint.config.js     # Linting config
├── 📄 tsconfig.json        # TypeScript config
├── 📄 tsup.config.ts       # Bundler config
├── 📄 turbo.json           # Turborepo config
├── 📄 package.json         # NPM metadata
```

---

## ✨ Features

| Feature             | Description                                     |
| ------------------- | ----------------------------------------------- |
| 📤 Send SMS         | Easily send SMS using Twilio or custom provider |
| 🧪 Noop Provider    | Useful for local/testing environments           |
| 🔌 Pluggable Design | Add more providers with ease                    |

---

## 📦 Installation

```bash
pnpm add @repo/sms-service@workspace:* --filter api
```

## Required Environment variables

```bash
SMS_PROVIDER
TWILIO_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
```

---

### 📘 Example / Usage

- Must have to make ejs template in templates directory in package

```ts
import { sendSMS } from '@repo/sms-service';

// Twilio sms example
const sendSms = await sendSMS('9451845185', 'Hii good morning');
```

---
