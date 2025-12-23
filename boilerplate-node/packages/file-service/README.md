# 📦 @repo/file-service

A utility package for parsing and generating files in various formats including CSV, Excel, and PDF. Designed to be modular and extensible, it powers consistent file handling in backend applications.

---

## 📁 Folder Structure

```
📦 file-service/
├── 📁 .turbo/                      # Turborepo cache
├── 📁 dist/                        # Compiled output
├── 📁 node_modules/                # Dependencies
├── 📁 src/                         # Source code
│   ├── 📁 __tests__/               # Unit tests
│   ├── 📁 csv/                     # CSV-related utilities
│   ├── 📁 excel/                   # Excel-related utilities
│   ├── 📁 pdf/                     # PDF-related utilities
│   └── 📄 index.ts                 # Entry point for exports
├── 📄 eslint.config.js            # ESLint configuration
├── 📄 package.json                # NPM metadata
├── 📄 README.md                   # Project documentation
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tsup.config.ts              # tsup bundler configuration
├── 📄 turbo.json                  # Turborepo configuration
```

---

## ✨ Features Overview

| Feature              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| Multi-format Support | Handle CSV, Excel, and PDF file operations           |
| Modular Design       | Easy to extend with additional file types            |
| Typed API            | Built with TypeScript for safer development          |
| Ready-to-Use         | Ships with a sensible structure for production usage |
| Turborepo Friendly   | Optimized for monorepo environments with Turborepo   |
| Test Coverage        | Comes with a structured test directory               |

---

## Prerequisites

#### Install chromium-browser

```bash
sudo apt install chromium-browser
```

## 📦 Installation

```bash
pnpm add @repo/file-service@workspace:* --filter api
```

---

### 📘 Example / Usage

- Must have to make ejs template in templates directory in package

```ts
import { generateCsv } from '@repo/file-service/csv';
import { generatePdf } from '@repo/file-service/pdf';
import { generateExcel } from '@repo/file-service/excel';

  const file = await pdfService.generatePdfFromTemplate(pdfService.TemplateNames['USER_SUBSCRIPTION_INVOICE'], {
            app_logo: appConfig.appLogoUrl,
            name: userSubscription.user.fullname,
            email: userSubscription.user.email,
            ....
        });
```

---
