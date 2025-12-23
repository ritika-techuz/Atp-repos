# 🔐 @repo/tokens

A secure JWT utility package designed to handle token signing, verification, and key management using RSA encryption. Built for use across authentication services in backend applications.

---

## 📁 Folder Structure

```
📦 tokens/
├── 📁 .turbo/              # Turborepo cache
├── 📁 dist/                # Compiled output
├── 📁 node_modules/        # Dependencies
├── 📁 src/                 # Source code
│ ├── 📁 tests/             # Unit tests
│ ├── 📁 jwt/               # JWT sign/verify logic
│ ├── 📁 keys/              # RSA keypair (private/public)
│ │ ├── 🔐 private.key      # Private RSA key (used for signing)
│ │ └── 🔓 public.pub       # Public RSA key (used for verifying)
│ └── 📄 index.ts           # Entrypoint for exports
├── 📁 scripts/             # Utility scripts
│ └── 🛠️ generateKeys.ts    # Script to generate RSA keypair
├── 📄 eslint.config.js     # ESLint configuration
├── 📄 package.json         # NPM metadata
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 tsup.config.ts       # tsup bundler configuration
├── 📄 turbo.json           # Turborepo configuration
```

---

## ✨ Features Overview

| Feature            | Description                                 |
| ------------------ | ------------------------------------------- |
| JWT Signing        | Sign payloads using RSA private key         |
| JWT Verification   | Verify tokens using RSA public key          |
| Secure Key Storage | Uses asymmetric key pair (RS256)            |
| Key Generator      | Script to generate and manage new key pairs |

---

## 📦 Installation

```bash
pnpm add @repo/tokens@workspace:* --filter api
```

## Required Environment variables

```bash
JWT_SECRET
JWT_EXPIRES_IN
```

## Key Generation command

```bash
pnpm generate-keys
```

---

### 📘 Example / Usage

```ts
import { jwtUtil } from '@repo/tokens';

//Sign jwt example
const token = jwtUtil.signJwt({
    user_id: userDetails.id,
    email: userDetails.email,
    reset_password_token: resetPasswordToken
});

//Verify jwt example
const decoded = jwtUtil.validateJwt(token);
```

---
