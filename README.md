# Quotely

> A sleek, AI-powered quote generation and discovery app.

## Features

- **AI Quote Generation** — Generate unique, context-aware quotes using AI
- **Smart Search & Discovery** — Browse quotes by mood, theme, or author
- **Collections** — Save and organize your favorite quotes
- **Share & Export** — Copy, tweet, or download quotes as images
- **Responsive Design** — Works beautifully on desktop and mobile

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **AI Integration:** Custom AI Agent component
- **State Management:** React Hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/quotely.git
cd quotely

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
quotely/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components + AIAgent
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT

---

Made with ❤️ by [YOUR_NAME](https://github.com/YOUR_USERNAME)
