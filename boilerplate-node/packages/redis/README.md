# 📦 @repo/redis

A Redis utility package for interacting with a Redis store, including operations to set, get, delete, and list cached data. Built for use across a Node.js monorepo.

---

## 📁 Folder Structure

```
📁redis
    📁 .turbo                # Turbo build cache
    📁 dist                  # Build output (compiled files)
    📁 node_modules          # Node.js dependencies
    📁 src                   # Source files
    ├── 📁 __tests__         # Test files
    ├── 📄 connection.ts     # Redis client setup
    ├── 📄 index.ts          # Entry file (re-export services)
    ├── 📄 service.ts        # Redis service functions (get, set, delete, list)
    📄 eslint.config.js      # ESLint configuration
    📄 package.json          # NPM package metadata
    📄 README.md             # Documentation
    📄 tsconfig.json         # TypeScript configuration
    📄 tsup.config.ts        # tsup bundler configuration
    📄 turbo.json            # Turborepo config

```

## 📦 Features

- **Set** data with optional expiration time
- **Get** data by key
- **Delete** keys
- **List** all Redis keys
- Designed with testability and logging in mind

---

## 📦 Installation

```bash
pnpm add @repo/redis@workspace:* --filter api
```

## Required Environment variables

```bash
REDIS_HOST          = 'localhost'
REDIS_PORT          = '6379'
REDIS_PASSWORD      = 'password'
REDIS_MAX_MEMORY    = '1GB'
REDIS_MEMORY_POLICY = 'allkeys-lru'
```

---

## Local Setup with docker 🐬

```bash
docker run --name my-redis \
  -p 6379:6379 \
  -e REDIS_PASSWORD=password \
  -e REDIS_MAXMEMORY=1gb \
  -e REDIS_MAXMEMORY_POLICY=allkeys-lru \
  -d redis:latest --requirepass password
```

---

#### ⭕ NOTE : Make sure to add variables in config package ( If adding new )

---

### 📘 Example / Usage

```ts
import { getRedisData, setRedisData, deleteRedisData } from '@repo/redis';

const key = 'token';
const value = 'anc43jbnucfn';

// get data
const getData = await getRedisData(key);

// set data
const setData = await setRedisData(key, value, 3600);

// delete data
const deleteData = await deleteRedisData(key);

// Fetch all data
const getAll = await listRedisData();
```

---
