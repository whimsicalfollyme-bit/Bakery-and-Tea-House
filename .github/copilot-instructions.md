This repository is a small static website for a Bakery & Tea House. The site is intentionally simple: plain HTML, CSS, and minimal JS. Use these instructions to help AI coding agents get productive quickly.

1) Big picture
- Static single-page site: `index.html` is the canonical entry.
- Styling lives in `css/styles.css` and small scripts are in `js/main.js`.
- No build toolchain or package manager by default; files are served as-is.
- Deployment: GitHub Pages via `.github/workflows/pages.yml` (push to `main` triggers a Pages deploy).

2) Key files & where to make common changes
- `index.html`: add/modify content, sections (hero, menu, about, contact). Use semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`).
- `css/styles.css`: site theming (CSS variables at top), layout and responsive rules. Prefer adding new utility classes rather than rewriting the whole file.
- `js/main.js`: small UI interactions (scroll-to, focus handlers). Keep JS minimal and accessible.
- `README.md`: local preview commands and high-level notes.
- `.github/workflows/pages.yml`: CI that deploys the repo root to GitHub Pages when `main` is pushed.

3) Development & preview workflow (explicit commands)
- Quick local preview (no install required):
  - `python3 -m http.server 8000` (run from repo root)
  - Open `http://localhost:8000`
- Commit and push to `main` to trigger the GitHub Pages workflow. The workflow packages the repo and deploys to Pages using the Pages actions.

4) Project-specific conventions & patterns
- Keep all static assets under `assets/` if adding images, fonts or media (create this folder instead of scattering large files across the tree).
- Use CSS variables in `css/styles.css` for theme colors (see `:root` at top of file).
- Prefer semantic HTML and progressive enhancement: scripts in `js/main.js` should only add UX flair, not required functionality.
- Keep third-party libraries out of the repo unless necessary. If adding npm-managed tooling, add a `package.json` at the repo root and update the README with install steps.

5) Integration points & deployment notes
- GitHub Pages workflow (`.github/workflows/pages.yml`) currently uploads the repository root and uses the Pages deployment action. If you move source files to a `src/` folder a build step must produce output into a directory and the workflow must upload that directory.
- If adding a bundler (Vite/webpack), update the workflow to run the build (`npm ci && npm run build`) and upload `dist/` instead of `./`.

6) Typical agent tasks (do this first)
- Small content edits: modify `index.html` and `css/styles.css`.
- Add images: create `assets/images/`, optimize files, and update `index.html` paths.
- Accessibility and micro-interactions: enhance `js/main.js` and ensure keyboard focus/ARIA where appropriate.
- Add deploy automation: modify or replace `.github/workflows/pages.yml` to match any new build step.

7) Safety rules and merge guidance
- Keep changes minimal and focused. Do not bulk-reformat unrelated files.
- When adding dependencies, update `README.md` with exact install and run commands.
- Avoid committing large binary assets directly; prefer `assets/` and document why they're needed.

8) Examples (quick edit snippets)
- Scroll-to-menu button in `js/main.js`:
  - `document.getElementById('orderBtn').addEventListener('click', () => document.getElementById('menu').scrollIntoView({behavior:'smooth'}));`
- Add a new featured item (edit `index.html` in the `#menu` list):
  - `<li class="card"><strong>Scone</strong><span>Buttery with jam</span></li>`

9) If you're unsure
- Run the local preview and inspect the page in the browser first.
- If a proposed change adds build tooling (npm, bundlers), ask for permission before adding dependencies.

If any section here is unclear or you'd like more detail (for example: add a `package.json`, switch to a static site generator, or scaffold CI with build steps), tell me which direction and I'll update these instructions and implement the changes.
