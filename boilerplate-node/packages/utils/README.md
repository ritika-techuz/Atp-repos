# 🔧 @repo/utils

A collection of lightweight utility functions commonly used across backend applications. This package provides helpers for formatting, password hashing, validation, URL manipulation, and pagination config. Designed for consistency, reusability, and monorepo setups using Turborepo.

---

## 📁 Folder Structure

```
📦 utils/
├── 📁 .turbo/              # Turborepo cache
├── 📁 dist/                # Compiled output
├── 📁 node_modules/        # Dependencies
├── 📁 src/                 # Source code
│ ├── 📁 tests/             # Unit tests
│ ├── 📁 config/            # Pagination config utilities
│ ├── 📁 crypto/            # Password hashing and comparison
│ ├── 📁 format/            # Date formatting utilities
│ ├── 📁 random/            # Random string/ID generation
│ ├── 📁 url/               # Base URL construction
│ ├── 📁 validation/        # Email,file-size and password validators
│ └── 📄 index.ts           # Entrypoint for re-exports
├── 📄 eslint.config.js     # ESLint configuration
├── 📄 package.json         # NPM metadata
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 tsup.config.ts       # tsup bundler configuration
├── 📄 turbo.json           # Turborepo configuration
```

---

## ✨ Features Overview

| Utility Area    | Description                                    |
| --------------- | ---------------------------------------------- |
| Format          | Convert and format date/time strings           |
| Crypto          | Securely hash and verify passwords             |
| Config          | Pagination configuration and helpers           |
| URL             | Generate consistent base URLs                  |
| Validation      | Validate emails, filesize and strong passwords |
| Random          | Generate secure random strings/IDs             |
| Typed & Modular | Fully typed and designed for reuse             |
| Monorepo Ready  | Works out-of-the-box with Turborepo            |

---

## 📦 Installation

```bash
pnpm add @repo/utils@workspace:* --filter api
```

---

### 📘 Example / Usage

```ts
import { getBaseUrlFromUrl, createPagination, validateFileSize, generateRandomString, hashPassword } from '@repo/utils';

//base url example
await authService.forgetPasswordService({ ...body, client_base_url: getBaseUrlFromUrl(req.get('Referrer')) });

// Generate random string example
const randomString = generateRandomString(25);

// Hashed password example
const hashedPassword = await hashPassword(password);

// Pagination Example
const query = await model.query().select(...commonAttributes);
const rows = createPagination(query.total, page, perPage, query.results);

// Validate file size example
validateFileSize(file.size, filemaxSize);
```

---
