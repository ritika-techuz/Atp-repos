# Turbo Repo

This is a monorepo template using [Turbo](https://turbo.build/), a high-performance build system for monorepos.

## Directory Structure

```
- 📂 repo
   - 📄 .env
   - 📂 apps
     - 📂 api
   - 📂 packages
     - 📂 @repo/eslint-config
     - 📂 @repo/jest-presets
     - 📂 @repo/typescript-config
     - 📂 @repo/logger
     - 📂 @repo/config
     - 📂 @repo/tokens
     - 📂 @repo/db
     - 📂 @repo/i18n
     - 📂 @repo/validator
     - 📂 @repo/response-handler
     - 📂 @repo/stripe
     - 📂 @repo/mailer
     - 📂 @repo/chat
     - 📂 @repo/socket
     - 📂 @repo/notification
     - 📂 @repo/sms-service
     - 📂 @repo/firebase-auth
     - 📂 @repo/file-service
     - 📂 @repo/storage-service
```

Each package has its own README file that explains what the package is for and how to use it.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/techuz/turbo-repo-demo.git
cd turbo-repo-demo
```

### 2. Use the appropriate Node version

```bash
nvm use
```

### 3. Install Pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 4. Install dependencies

```bash
pnpm install
```

### 5. Set up environment variables

```bash
cp .env.example .env
```

Update the variables in `.env` as needed.

### 6. Generate JWT keys

```bash
pnpm generate-keys
```

This creates `private.key` and `public.pub` in `packages/tokens/src/keys`.

### 7. Set up the database

```bash
pnpm migrate
pnpm run-seed
```

Optional commands:

```bash
pnpm rollback                   # Rollback last migration
pnpm run-specific-seed <file>   # Run a specific seed file
```

### 8. Running the application

#### Development Mode

```bash
pnpm dev
```

#### Production Mode

```bash
pnpm start
```

### 9. Clear the database

```bash
pnpm clear-db
```

---

## ⚠️ External Dependencies Required

### 1. Chromium (for PDF generation)

Used by Puppeteer for generating PDFs or screenshots.

#### Ubuntu/Debian

```bash
sudo apt-get install -y chromium-browser
```

#### macOS

```bash
brew install chromium
```

#### Windows

- Install Chrome manually or add Chromium path to `PUPPETEER_EXECUTABLE_PATH` in `.env`.

### 2. Redis

Required for caching, socket management, etc.

#### macOS

```bash
brew install redis
brew services start redis
```

#### Ubuntu

```bash
sudo apt-get install redis
sudo systemctl enable redis
sudo systemctl start redis
```

### 3. MySQL

Configure credentials in `.env` and ensure the DB server is running.

---

## Additional Commands

```bash
pnpm clean                      # Remove dist folders and build artifacts
pnpm build                      # Build all packages
pnpm dev                        # Start dev server
pnpm start                      # Start prod server
pnpm make-migration <name>      # Create a new migration
pnpm migrate                    # Run all migrations
pnpm rollback                   # Revert last migration
pnpm clear-db                   # Revert all migrations and clear DB
pnpm make-seed <name>           # Create a new seeder
pnpm run-seed                   # Run all seeders
pnpm run-specific-seed <file>   # Run a specific seed file
pnpm format                     # Format codebase
pnpm lint                       # Lint code
pnpm check-types                # Type-check codebase
pnpm test                       # Run tests
```

---

## Important Libraries Used

- **Turbo** — Monorepo toolkit
- **Express.js** — Backend framework
- **Objection.js** — SQL ORM
- **EJS** — Email/PDF templates
- **Nodemailer** — Email delivery
- **Twilio** — SMS sending
- **Socket.io** — Real-time communication
- **Redis** — Caching and sessions
- **Puppeteer/Chromium** — PDF generation
