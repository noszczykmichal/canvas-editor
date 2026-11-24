# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Canvas Editor: a React 18 + TypeScript + Vite single-page app for composing posters (background image, one movable/resizable image box, one movable/resizable text area with a color palette) and exporting them as a 1080×1350 PNG. Hosted on Firebase Hosting (serves `build/`, SPA rewrite to `index.html`).

## Commands

Package manager is **pnpm**.

- `pnpm install` — install dependencies
- `pnpm run dev` — dev server on port 3000 (`--host`, so exposed on LAN)
- `pnpm run build` — `tsc` type-check, then `vite build` into `build/` (not `dist/`)
- `pnpm run serve` — preview the production build
- `pnpm run lint` / `pnpm run lint:fix` — ESLint (airbnb + airbnb-typescript + prettier)

- `pnpm test` — Vitest in watch mode; `pnpm run test:run` for a single run
- Single file / single test: `pnpm exec vitest run src/App.test.tsx` / `pnpm exec vitest run -t "test name"`

Tests use Vitest + jsdom + Testing Library, configured in `vitest.config.mts` (kept separate from `vite.config.mts` so the eslint/checker plugins don't run during tests). Test files are `src/**/*.{test,spec}.{ts,tsx}`. Vitest globals are off, so import `describe`/`it`/`expect` from `vitest`. `src/setupTests.ts` loads jest-dom matchers, runs RTL `cleanup`, and creates the `#modals-root` portal target that `Layout` needs (normally provided by `index.html`). Components read from `CanvasContext`, so render them inside `CanvasContextProvider`.

ESLint and type-checking also run inside Vite (`vite-plugin-eslint`, `vite-plugin-checker`), so lint errors surface in the dev server/build output.

## Code style

- Prettier: double quotes, semicolons, trailing commas everywhere, 2-space indent, 80 cols. ESLint enforces double quotes and prettier formatting as errors.
- Components are arrow functions with a default export; unused args must be prefixed with `_`.
- Import via tsconfig path aliases (`@components/*`, `@hooks/*`, `@icons/*`, `@sassStyles/*`, `@store/*`, `@utils/*`, rooted at `src/`) rather than deep relative paths in TS. SCSS files use relative `@use "../../sassStyles/variables" as vars;` (and `mixins`).
- Each component lives in its own folder with a co-located `.scss` file imported as a plain side-effect import (`import "./X.scss"`) using BEM-ish global class names. `vite-plugin-sass-dts` generates `*.scss.d.ts` files (gitignored) — don't edit or commit them.

## Git

- Commit messages are fully lowercase (subject and body), e.g. `set up vitest with jsdom and testing library`.

## Architecture

- **Global state**: a single React context, [src/store/context.tsx](src/store/context.tsx) (`CanvasContext` / `CanvasContextProvider`, wrapped around `App` in `main.tsx`). It holds both state (background image data URL, image box data URL, `isTextFieldAdded`, `textColor`, backdrop/modal flags) and shared DOM refs (`fileInputRef`, `canvasContainerRef`, `textAreaRef`, `textAreaDivCloneRef`). Components across the tree reach into these refs directly, so adding new cross-component behavior usually means adding a field/ref here.
- **Layout**: `App` renders `Canvas` (the poster preview) and `CanvasControls` (sidebar) inside `Layout`, which also renders the `ui/Backdrop` + `ui/Modal` overlays (Modal is used for the reset confirmation, animated with react-transition-group).
- **Single shared file input**: `Canvas` owns one hidden `<input type="file">`. `ControlButton` triggers it programmatically and sets a `data-source` attribute (`"imageBox"` or `"background"`); `Canvas`'s change handler reads that attribute to decide which context field receives the FileReader data URL. Control buttons are driven by `controlsConfig` in [src/utils/config.ts](src/utils/config.ts).
- **Backdrop while a native dialog is open**: `useFocusBack` shows the backdrop and adds a one-shot window `focus` listener to hide it, because there is no event when the user cancels the file picker / save dialog.
- **Drag and resize**: `useMove` and `useResize` attach pointer + touch listeners to an SVG handle ref and return `{x, y}` / `{width, height}` that `ImageBox` and `TextArea` apply via inline styles (`transform: translate(...)`, width/height).
- **Export** ([CanvasControls.tsx](src/components/CanvasControls/CanvasControls.tsx)): uses `html2canvas` on `canvasContainerRef` at scale 2, then redraws into a fixed 1080×1350 canvas and saves via `showSaveFilePicker` (fallback: anchor download). Before capture it pins the container's pixel size and swaps the `<textarea>` for a hidden `<div>` clone (`textAreaDivCloneRef`) because html2canvas renders textarea text incorrectly; both are reverted afterward. Keep this swap in mind when changing `TextArea` markup.
