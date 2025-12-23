# 💵 @repo/stripe

A wrapper around the Stripe Node.js SDK for managing customers, subscriptions, payments, and webhook validation in a clean, type-safe manner.

---

## 📁 Folder Structure

```
📦 stripe
├── 📁 .turbo/            # Turborepo cache
├── 📁 dist/              # Compiled output
├── 📁 node_modules/      # Dependencies
├── 📁 src/
│ ├── 📁 tests/           # Unit tests
│ ├── 📄 stripe.ts        # Main Stripe service logic
│ └── 📄 index.ts         # Entrypoint export
├── 📄 eslint.config.js   # Linting config
├── 📄 tsconfig.json      # TypeScript config
├── 📄 tsup.config.ts     # Build config
├── 📄 turbo.json         # Turborepo config
├── 📄 package.json       # NPM metadata
```

---

## ⚙️ Features

| Feature                 | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| 👤 Customer Management  | Create Stripe customers                                        |
| 💰 Payment Intents      | Create one-time payment intents with automatic payment methods |
| 📅 Subscriptions        | Create,upgrade,cancel customer subscriptions                   |
| 💸 Promo Codes          | Create, delete, and validate Stripe promo codes                |
| 🔄 Webhook Verification | Securely validate Stripe webhook requests                      |
| 🔒 Secure Key Handling  | Uses config from `@repo/config`                                |
| 🛍️ Product Management   | Create and update Stripe products and prices                   |

---

## 📦 Installation

```bash
pnpm add @repo/stripe@workspace:* --filter api
```

## Required Environment variables

```bash
STRIPE_LIVE_MODE='0' # 0: false, 1: true
STRIPE_SECRET_KEY
STRIPE_SUBSCRIPTION_VERIFICATION_WEB_HOOK_SECRET
STRIPE_SUBSCRIPTION_CANCELLATION_WEB_HOOK_SECRET
```

---

#### ⭕ NOTE : Make sure to add variables in config package ( If adding new )

---

### 📘 Example / Usage

```ts
import { stripeService } from '@repo/stripe';

const stripeSignature = req.headers['stripe-signature'];

// create customer example
const stripe_customer = await stripeService.createCustomer(first_name + ' ' + last_name, email);

// promo code validator example
const promoCode = await stripeService.validatePromoCode(promo_code);

// creating subscription example
const subscription = await stripeService.createSubscription(user.stripe_customer_id, planDetails.price_id, promo_code?.id);

// Upgrade subscription
const subscription = await stripeService.upgradeSubscription(
    userSubscription.subscription_id,
    userSubscription.subscription_item_id,
    planDetails.price_id,
    promo_code?.id
);

// Cancle subscription
await stripeService.cancelSubscription(userSubscription.subscription_id);

// Verify webhook example
const event: any = await stripeService.verifyWebhookRequest(stripeConfig.stripeSubscriptionVerificationWebHookSecret, stripeSignature, body);
```

---
