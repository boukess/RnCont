# CreatorOS

A working first version of the CreatorOS pitch deck, with a shared React interface for the web and a Windows desktop app built with Electron.

## What works today

- Upload and preview images, video, and audio (250 MB per file limit).
- Retain original media locally in IndexedDB.
- Create and edit drafts with captions, media links, and seven publishing destinations.
- Use a clearly labeled caption starter template (not generative AI).
- Review and approve drafts. Editing a draft resets its approval and removes its scheduled time.
- Add approved drafts to a local planning calendar.
- Retain drafts and timestamped activity locally across restarts.
- Export workspace metadata, draft copy, and audit history as JSON.
- Responsive web interface, including phone layouts.

**This is a local MVP, not a connected social automation service.** AI generation, video rendering, account OAuth, publishing, server-side job scheduling, cloud synchronization, community messages, Twitch events, and analytics are not implemented. No demo metrics or fake publishing successes are shown. Scheduled posts will not be sent to a social network.

## Deploy the website on Vercel

Download `CreatorOS-Vercel.zip`, upload its extracted contents to the root of your GitHub repository, then import that repository at https://vercel.com/new and click **Deploy**. Build settings are already in `vercel.json`; no environment variables are required. See [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md) for upload instructions. The website and Windows application remain separate deployment targets.

## Run the website

Install Node.js 24 LTS, then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open the address Vite prints in the terminal. For a production web build:

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static website host such as Vercel or Netlify. No server credentials are needed for this local version. Use HTTPS for the public website. The site is not deployed by this repository.

All fonts are bundled, so the packaged interface does not depend on Google Fonts or another external asset service.

## Run on Windows

The portable download contains the entire Windows application folder. Extract **all** files into a folder, then open `CreatorOS.exe`. Do not move the executable out of its folder. The package is unsigned; this is a development build. It was cross-packaged on Linux and has not been run on a Windows computer yet.

To run from source on Windows 10/11 x64 with Node.js installed:

```powershell
npm ci
npm run desktop
```

To make a Windows app folder:

```powershell
npm run desktop:windows
```

The result is `release/win-unpacked/CreatorOS.exe` alongside its required runtime files. `signAndEditExecutable` is disabled for this unsigned prototype so Linux cross-packaging does not require Wine for executable resource editing. A production release needs a proper app icon, Windows runtime validation, an installer, and code signing.

If dependencies were installed with `--ignore-scripts`, run `node node_modules/electron/install.js` before launching Electron locally. This is unnecessary when only serving the website or cross-packaging Windows.

## Verify

```sh
npm test
npm run build
npm run test:browser
```

Browser tests use `/usr/bin/chromium` in the cloud environment. Elsewhere, set `CHROMIUM_PATH` to your installed Chromium or Chrome executable. Alternatively, install Playwright's Chromium and remove the custom `executablePath` from `playwright.config.js`.

The browser suite exercises media upload and preview, draft creation, editing with approval reset, approval, local scheduling, persistence after reload, JSON export, and mobile layout. Unit tests cover validation and status transitions.

## Data and privacy

Drafts and audit metadata are in localStorage under `creatoros-v1`. Files are in the IndexedDB database `creatoros-media`. Browser and desktop storage are separate. There is no account system or device sync. Clearing browser/app data removes the workspace. JSON export does **not** contain original media or provide an import/restore feature; retain source media backups separately.

No API keys should be put into client code, browser storage, or content drafts. Electron uses a sandboxed renderer with Node integration disabled, context isolation enabled, denied permission requests, and blocked new windows and navigation.

## Next implementation stage

1. Add Supabase authentication, per-user database access policies, and private media storage.
2. Add a backend API for server-side AI generation, encrypted OAuth credentials, and platform adapters. Keep provider keys off the client.
3. Add durable publishing jobs with idempotency keys, retries, cancellation, and external publication IDs. Recheck approval at execution time.
4. Integrate Buffer or supported direct APIs, test real publication to a designated account, and record the result.
5. Add worker-based FFmpeg media derivatives before supported community and analytics integrations.

The deck's platform and pricing claims remain planning inputs; verify current API permissions and vendor plans before integrating. Twitch is a separate live-event workflow, not one of the seven posting channels.
