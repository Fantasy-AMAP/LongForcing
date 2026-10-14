# LongForcing project page

[Project page](https://fantasy-amap.github.io/LongForcing/)

This branch contains the academic website, explanatory animation, figures, and qualitative videos. The `main` branch contains only the project link.

## Local preview

Requires Node.js 22.12 or newer.

```sh
npm ci
npm test
npm run preview
```

Open http://localhost:4173/LongForcing/. For development, use `npm run dev` and http://localhost:5173/LongForcing/.

## GitHub Pages deployment

1. Push `main` to `origin` first so it becomes the repository's default branch.
2. In the repository, open **Settings → Pages → Build and deployment**, and set **Source** to **GitHub Actions**.
3. Push `project-page` to `origin`. The **Deploy project page** workflow builds, tests, and uploads only `dist/`.
4. Wait for both build and deploy jobs to pass. The public URL is https://fantasy-amap.github.io/LongForcing/.

```sh
git push -u origin main
git push -u origin project-page
```

If the `github-pages` environment has deployment branch restrictions, allow `project-page` under **Settings → Environments → github-pages**. Subsequent pushes to `project-page` automatically update the website. `main` does not deploy.

If the repository or owner is renamed, update the base path in `vite.config.ts`, the metadata in `index.html`, and both README links.

The page is built with Vite and React, with HTML generated at build time and interactive components hydrated in the browser. It requires no server or Cloudflare bindings. Videos are included directly in the repository; no Git LFS is required.
