# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website/blog built with SvelteKit (older "next" version), TypeScript, mdsvex for markdown processing, and Tailwind CSS. Deployed to Vercel with static site generation.

## Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Type checking
yarn check

# Type checking with watch mode
yarn check:watch

# Lint code (Prettier + ESLint)
yarn lint

# Format code
yarn format
```

## Article System Architecture

Articles are the core content type. They use a dynamic import pattern with mdsvex to convert markdown files into Svelte components.

### How Articles Work

1. **Article Files**: Markdown files in `src/routes/articles/*.md` with frontmatter metadata
2. **Frontmatter Structure**:
   ```yaml
   ---
   title: 'Article Title'
   date: YYYY-MM-DD
   tags:
     - Tag1
     - Tag2
   ---
   ```
3. **Dynamic Import**: The API endpoint `src/routes/api/articles.json.ts` uses `import.meta.glob('../articles/*.md')` to dynamically import all articles at build time
4. **Article Metadata**: Each article's frontmatter is extracted as `metadata` from the import and transformed into the `ArticleType` shape defined in `src/types/Article.ts`
5. **Sorting**: Articles are sorted by date (newest first) in the API endpoint
6. **Rendering**: mdsvex automatically converts markdown files to Svelte components using the layout defined in `mdsvex.config.js`

### Article Layout System

- **Default Layout**: `src/lib/ArticleLayout.svelte` is configured in `mdsvex.config.js` as the default layout for all markdown files
- **Custom Components**: `ArticleLayout.svelte` exports a custom `<a>` component (`ArticleLink.svelte`) that's used for all links in article markdown
- **Extensions**: mdsvex processes `.svelte.md`, `.md`, and `.svx` files
- **Remark Plugin**: Uses `remark-images` for enhanced image handling in markdown

### Article Routing

- Articles are accessible at `/articles/{filename}` (without the .md extension)
- The `/articles` page (`src/routes/articles.svelte`) fetches and displays a list of all articles from the API endpoint
- **Redirects**: `vercel.json` contains permanent redirects from old URL structure (e.g., `/implement-set-of-stacks`) to new structure (`/articles/implement-set-of-stacks`)

### Adding New Articles

To add a new article:
1. Create a new `.md` file in `src/routes/articles/`
2. Add frontmatter with `title`, `date`, and `tags`
3. If migrating from an old URL structure, add a redirect in `vercel.json`
4. The article will automatically appear in the articles list and be accessible at `/articles/{filename}`

## SvelteKit Version Note

This project uses an older version of SvelteKit (the "next" release channel from ~2021-2022). Some APIs and patterns differ from modern SvelteKit:
- Uses `__layout.svelte` instead of `+layout.svelte`
- Uses `.svelte` files for routes instead of `+page.svelte`
- Uses `context="module"` with `load` function instead of `+page.ts`/`+page.server.ts`
- Uses `target: '#svelte'` in kit config (deprecated in newer versions)

## Project Structure

```
src/
├── lib/              # Reusable Svelte components (Nav, Footer, ArticleLayout, etc.)
├── routes/           # File-based routing
│   ├── articles/     # Markdown article files
│   ├── api/          # API endpoints (articles.json.ts)
│   ├── __layout.svelte  # Root layout
│   └── *.svelte      # Page components
├── styles/           # Additional stylesheets
├── types/            # TypeScript type definitions
├── app.css           # Global styles with Tailwind
└── app.html          # HTML template
```

## Static Assets

Static files (images, favicon) are in the `static/` directory and served from the root path.
