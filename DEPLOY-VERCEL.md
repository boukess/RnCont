# Upload files now, deploy on Vercel later

This repository is configured for Vercel. No terminal commands, API keys, or custom build settings are needed when importing it through Vercel's dashboard.

## 1. Put the files in GitHub

1. Download and extract `CreatorOS-Vercel.zip`.
2. Open your `boukess/RnCont` repository on GitHub.
3. Choose **Add file → Upload files**. For an empty repository, use the **uploading an existing file** link.
4. Upload the extracted contents, not the ZIP itself. Keep the `src`, `desktop`, and `tests` folder structure intact. Upload any dotfiles too.
5. Make sure `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, and `vercel.json` are directly in the repository root. Do not put them inside an extra `CreatorOS` folder.
6. Commit the files to `main`.

The ZIP excludes dependency folders, generated builds, desktop binaries, and credentials. Vercel will install and build the website from the source files.

## 2. Import on Vercel whenever you are ready

1. Visit https://vercel.com/new and sign in.
2. Choose **Import Git Repository** and select `boukess/RnCont`. Grant Vercel repository access if prompted.
3. Give the new Vercel project your preferred available name, such as `creatoros`.
4. Leave **Root Directory** as the repository root (`./`).
5. Click **Deploy**. The included configuration supplies the build settings automatically.

After a successful build, Vercel provides the actual HTTPS address. A particular `creatoros.vercel.app` address is not guaranteed to be available. Future commits to `main` trigger production deployments under the normal Git integration settings.

## Included configuration

| Setting | Included value |
| --- | --- |
| Framework | Vite |
| Node.js | 24.x, declared in package.json |
| Install command | npm ci --ignore-scripts |
| Build command | npm run build |
| Output directory | dist |
| Environment variables | None required for the current MVP |

The frozen dependency lockfile is included. Install scripts are skipped because this web build does not need to download Electron's desktop runtime. The desktop code stays in the GitHub repository for Windows development; `.vercelignore` excludes it from CLI uploads. Vercel builds only the web frontend. Fonts are included locally. Generated assets receive immutable caching; basic security headers are configured in `vercel.json`.

Do not change the Vercel build command to `npm run desktop`, and do not upload `node_modules`, `release`, or `.env` files.

## What the deployed site supports

The site provides media uploads, editable drafts, manual approvals, a local planning calendar, and JSON export. Data stays in the browser on that device. Preview deployments, production deployments, and the desktop app have separate storage. Clearing site data removes local work.

AI generation, social account OAuth, automatic publishing, analytics, accounts, and cross-device sync are not implemented yet. Those features will require a backend and securely configured services later. No provider keys should be added to the frontend.

## After deploying

Open the URL Vercel gives you. Upload media, create and approve a draft, schedule it locally, then reload to check that the same browser retains it. A scheduled item is a local plan and does not publish to a social network.
