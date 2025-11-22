# OSINT Research Web App

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/r1z/v0-osint-research-web-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/jbFcy8QEIcU)

## Overview

A comprehensive Open Source Intelligence (OSINT) platform designed for security analysts and law enforcement investigators to monitor, analyze, and investigate potential threats from social media and other open sources.

### Key Features

- **Entity Intelligence Search** - Pivot across domains, IPs, emails, usernames, and crypto addresses
- **Investigation Dashboard** - Professional dark-themed dashboard for case management at [`/osint-dashboard`](./app/osint-dashboard)
- **Graph Visualization** - Interactive node-link visualization showing relationships and patterns
- **Case Management** - Organize findings, add notes, and export shareable reports
- **Real-Time Enrichment** - Third-party intelligence integration with credit-based metering
- **Timeline Analysis** - 24-hour event timeline with playback controls
- **Risk Assessment** - Multi-category risk scoring with visual indicators
- **Social Media Monitoring** - Track and analyze social media posts across platforms

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/s3cr1z/v0-osint-research-web-app.git
cd v0-osint-research-web-app
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Routes

- `/` - Landing page with platform overview
- `/dashboard` - Main entity search and investigation interface
- `/osint-dashboard` - Comprehensive investigation dashboard
- `/cases` - Case management interface
- `/graph` - Entity relationship graph visualization
- `/billing` - Credit usage and billing management

## Project Structure

```
app/
├── osint-dashboard/     # Investigation dashboard components
│   ├── components/      # UI components (nav, panels, timeline, etc.)
│   ├── lib/            # Utilities and mock data
│   └── types/          # TypeScript type definitions
├── dashboard/          # Main search dashboard
├── cases/             # Case management
├── graph/             # Graph visualization
└── api/               # API routes

components/
└── ui/                # Shared UI components (shadcn/ui)

lib/
├── supabase/          # Supabase client configuration
└── integrations/      # Third-party integrations
```

## Security

We take security seriously. Please review our [Security Policy](./SECURITY.md) for information about:

- Supported versions
- Reporting vulnerabilities
- Security best practices
- Response timelines

**Note:** Do not report security vulnerabilities through public GitHub issues. Please follow the responsible disclosure process outlined in our [Security Policy](./SECURITY.md).

## Deployment

Your project is live at:

**[https://vercel.com/r1z/v0-osint-research-web-app](https://vercel.com/r1z/v0-osint-research-web-app)**

### Deploying Updates

This repository stays in sync with your deployed chats on [v0.app](https://v0.app). Any changes you make to your deployed app will be automatically pushed to this repository.

Continue building your app on:

**[https://v0.app/chat/jbFcy8QEIcU](https://v0.app/chat/jbFcy8QEIcU)**

### How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Technology Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives via shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **Graph Visualization:** Rete.js
- **State Management:** Zustand
- **Deployment:** Vercel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is for internal testing and investigation purposes.