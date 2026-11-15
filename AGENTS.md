# Aakaar Digital - React + Vite Project

This is a modern React + Vite TypeScript application built with Tailwind CSS v4 and React Router.

## Project Structure
- `src/`
  - `pages/`: Public site pages & Admin portal pages
  - `components/`: UI components (`site/`, `admin/`, `common/`)
  - `lib/`: Utilities, services data, SEO helper, auth, and API client
  - `globals.css`: Tailwind CSS v4 stylesheets and design tokens
  - `App.tsx`: Client-side routing with React Router
  - `main.tsx`: Entry point rendering the application
- `public/`: Static assets, favicon, robots.txt, sitemap.xml
- `vite.config.ts`: Vite bundler configuration with `@tailwindcss/vite` and `@vitejs/plugin-react`

## Commands
- `npm run dev`: Starts the Vite development server on port 3000
- `npm run build`: Type-checks and builds the production bundle to `dist/`
- `npm run preview`: Locally previews the production build

