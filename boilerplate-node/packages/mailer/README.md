# 📦 @repo/mailer

A robust email service utility built for modular backend applications. This package handles dynamic email rendering using EJS templates and sends emails via a pre-configured Nodemailer transporter. Ideal for applications using a monorepo setup with Turborepo.

---

## 📁 Folder Structure

```
📦 mailer/
├── 📁 .turbo/                  # Turborepo cache
├── 📁 dist/                    # Compiled output
├── 📁 node_modules/            # Dependencies
├── 📁 src/                     # Source code
│ ├── 📁 tests/                 # Unit tests
│ ├── 📁 templates/             # Email templates
│ │ ├── 📁 layouts/             # Layout wrappers (e.g., base.ejs)
│ │ └── 📁 partials/            # Partial templates (e.g., userSubscription.ejs)
│ ├── 📄 index.ts               # Entrypoint
│ ├── 📄 sendMail.ts            # Send mail helper using transporter + renderer
│ ├── 📄 subjectConstants.ts    # Subject line constants
│ ├── 📄 templateConstants.ts   # Template name constants
│ ├── 📄 templateList.ts        # Lists available templates
│ ├── 📄 templateRenderer.ts    # Renders EJS templates with layout
│ └── 📄 transporter.ts         # Nodemailer transporter setup
├── 📄 eslint.config.js         # ESLint configuration
├── 📄 package.json             # NPM metadata
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 tsup.config.ts           # tsup bundler configuration
├── 📄 turbo.json               # Turborepo configuration
```

---

## ✨ Features Overview

| Feature            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| EJS Templates      | Write reusable and dynamic email templates using EJS      |
| Layout Support     | Consistent email structure with layout wrapping           |
| Nodemailer Support | Easily send emails via configurable transporter           |
| Template Discovery | Auto-discovers available templates in `templates/` folder |
| Typed API          | TypeScript-first development experience                   |
| Turborepo Ready    | Designed for integration in a monorepo using Turborepo    |
| Config Integration | Uses shared config via `@repo/config`                     |

---

## 📦 Installation

```bash
pnpm add @repo/mailer@workspace:* --filter api

```

---

## 🔧 Prerequisites

### Ensure the following shared configs are available via @repo/config:

- appConfig.appName
- appConfig.appLogoUrl
- mailerConfig.smtpHost
- mailerConfig.smtpUser
- mailerConfig.smtpPort
- mailerConfig.smtpPass
- mailerConfig.smtpSecure

## Required Environment variables

```bash
SMTP_FROM_EMAIL
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
SMTP_SECURE
```

---

### 🧩 Template Rendering Logic

#### Each template is rendered with a base layout (layouts/base.ejs) and injected with a context object. Here's how rendering works under the hood:

- Load partial EJS file (e.g., welcome.ejs)
- Inject context data (e.g., { name: "Jane" })
- Embed the rendered partial inside the layout
- Return final HTML for sending

---

### 📘 Example / Usage

- Must have to make ejs template in templates directory in package

```ts
import { sendMail, SUBJECTS, TEMPLATES } from '@repo/mailer';

await sendMail(userDetails.email, SUBJECTS.FORGOT_PASSWORD, TEMPLATES.FORGOT_PASSWORD, emailData);
```

---
