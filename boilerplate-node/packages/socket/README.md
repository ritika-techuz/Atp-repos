# 🔌 @repo/socket

A WebSocket service module that provides real-time communication capabilities using Socket.IO. This module serves as the core real-time communication layer for the application, handling WebSocket connections and managing real-time events.

---

## 📁 Folder Structure

```
📂 socket/
├── 📁 dist/                  # Compiled output
├── 📁 node_modules/          # Dependencies
├── 📁 src/                   # Source code
│   ├── 📂 constants
│   │   └── 📄 events.ts
│   └── 📄 index.ts           # Socket initialization code
├── 📁 .turbo/                # Turbo repo metadata
├── 📄 eslint.config.js       # ESLint configuration
├── 📄 package.json           # NPM package metadata
├── 📄 README.md              # Project documentation
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 tsup.config.ts         # tsup bundler config
└── 📄 turbo.json             # Turborepo configuration

```

---

## Installation

1. Install the package in your project:

```bash
pnpm add @repo/socket@workspace:* --filter api ( package name )
```

---

## ✨ Features

- WebSocket server initialization and management
- CORS configuration for secure cross-origin communication
- Integration with chat and notification services
- Singleton pattern for global socket instance management
- Error handling for socket connections

---

## 🛠 Usage

```typescript
import { socketManager } from '@repo/socket';
import { createServer } from 'http';

const server = createServer();
socketManager.initialize(server);

// Get socket instance when needed
const io = socketManager.getIO();
```

---

## Integration

This module is used by:

- Chat module for real-time messaging
- Notification module for real-time notifications

---

## Events

The module handles various socket events defined in `constants/events.ts`. These events are used for:

- Chat message handling
- Notification delivery
- Connection management
- Error handling
