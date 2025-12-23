# <-> api

An API service package built with Node.js and TypeScript, structured for modular development. Acts as the backend server within a monorepo, handling routes, middlewares, jobs, and more.

---

## 📁 Folder Structure

```
📁api
    📁 .turbo               # Turborepo build cache
    📁 dist                 # Build output (compiled JS)
    📁 node_modules         # Node.js dependencies
    📁 src                  # Application source code
    ├── 📁 __tests__        # Unit and integration tests
    ├── 📁 jobs             # Background jobs/workers
    ├── 📁 middlewares      # Express middlewares
    ├── 📁 modules          # Feature modules (routes, controllers, services)
    ├── 📁 types            # Shared TypeScript type definitions
    ├── 📁 www              # HTTP server entry point
    ├── 📄 index.ts         # App initializer/entry
    📄 eslint.config.js     # ESLint config
    📄 package.json         # Project metadata and scripts
    📄 README.md            # Documentation
    📄 tsconfig.json        # TypeScript configuration
    📄 tsup.config.ts       # tsup bundler config
    📄 turbo.json           # Turborepo project configuration
```

## ✅ Features

| Feature                   | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| 📁 Modular Structure      | Organized by modules for scalability and clean separation of concerns |
| 🧱 Middleware Support     | Easily extendable Express middleware architecture                     |
| 🛠️ Background Job Support | Includes a dedicated `jobs` directory for background processing       |
| 🧑‍💻 Type-Safe              | Written entirely in TypeScript for better maintainability and safety  |
| ⚡ Turborepo Integration  | Optimized builds and caching in a monorepo using Turborepo            |
| 📦 tsup Bundling          | Uses `tsup` for fast and efficient TypeScript bundling                |
| 🔍 Testing Support        | Comes with a `__tests__` folder to write unit and integration tests   |

---

## Required Environment variables

```bash
APP_NAME='Turbo'
APP_PORT='4000'
NODE_ENV='development'
APP_LOGO_URL='https://www.pngplay.com/wp-content/uploads/9/Facebook-Free-PNG.png'

IS_HTTPS='false'
APP_BASE_URL='http://localhost:4000/'
ALLOWED_HOSTS='http://localhost:4000/'
```

## Internal Package installation command

```bash
pnpm add <package name>@workspace:* --filter api
```

## Addition Commands

```bash
pnpm format
pnpm build
pnpm start
pnpm dev
```

---
