# 💬 @repo/chat

A real-time chat module that provides messaging capabilities using WebSocket connections. This module integrates with the socket service to handle real-time message delivery and chat functionality.

---

## 📁 Folder Structure

```
📂 chat/
├── 📁 dist/                  # Compiled output
├── 📁 node_modules/          # Dependencies
├── 📂 src
│   ├── 📂 constants
│   │   └── 📄 index.ts
│   ├── 📂 services           # Handle chat related service
│   │   └── 📄 chat.service.ts
│   ├── 📂 socket             # Handle chat events
│   │   └── 📄 chat.socket.ts
│   ├── 📂 types              # Types
│   │   └── 📄 index.ts
│   └── 📄 index.ts
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
pnpm add @repo/chat@workspace:* --filter api ( package name )
```

---

## Features

- Real-time message handling
- Chat room management
- Message persistence
- User presence tracking
- Message delivery status

---

## Usage

```typescript
import { ChatHandler } from '@repo/chat';
import { socketManager } from '@repo/socket';

// Chat handler is automatically initialized by socket manager
const io = socketManager.getIO();

// Use chat handler for message operations
const chatHandler = new ChatHandler(io);
```

---

## Integration

This module:

- Uses the socket module for real-time communication
- Stores messages in the database
- Handles user presence and typing indicators
- Manages chat rooms and direct messages

---

## Message Types

The module supports various message types:

- Text messages
- Direct messages
- Group messages
- System notifications

---

## Database Schema

Messages are stored with the following information:

- Sender ID
- Receiver ID
- Message content
- Timestamp
- Message type
- Delivery status

---

## Events

The module handles various chat-related events:

- Message sending/receiving
- User typing indicators
- User presence updates
- Message delivery status
- Chat room management
