# AI SaaS Dashboard

A modern React application built with TypeScript and Vite, featuring AI-powered chat, analytics dashboard, and file upload capabilities.

## Features

- AI Chat Interface with OpenRouter integration
- Analytics Dashboard
- File Upload functionality
- Responsive UI with Tailwind CSS

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ai-saas-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenRouter API key to `.env`:
     ```
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```
   - Get your API key from [OpenRouter](https://openrouter.ai/)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- OpenRouter AI API
- Zustand for state management

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
