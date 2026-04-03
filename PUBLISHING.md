# Publishing @414hustlerz/sidehusl-ui

## When to publish

Any time you add, modify, or remove components in this package and want those changes available in the consuming apps (Business app, Customer app).

## Steps

### 1. Bump the version

In the package root (`sidehuslUI-Package/`):

```bash
npm version patch    # for small additions/fixes (0.4.8 → 0.4.9)
npm version minor    # for new features (0.4.8 → 0.5.0)
npm version major    # for breaking changes (0.4.8 → 1.0.0)
```

### 2. Publish to GitHub Packages

```bash
npm publish
```

This runs `typecheck` automatically via `prepublishOnly`.

### 3. Update the consuming app(s)

In each app that uses the package (e.g. `SideHuslUI-Business-v2/SideHuslBusiness/`):

```bash
yarn add @414hustlerz/sidehusl-ui@latest
```

### 4. Restart Metro bundler

Metro caches resolved modules. After installing the new version:

- Press `Ctrl+C` to stop Metro if running
- Run `npx expo start --clear` to restart with a clean cache

## Quick one-liner (from package root)

```bash
npm version patch && npm publish
```

Then in the app:

```bash
yarn add @414hustlerz/sidehusl-ui@latest && npx expo start --clear
```

## Troubleshooting

- **"Cannot find module"** after publishing → Metro cache is stale. Run `npx expo start --clear`.
- **Version mismatch** → Check `node_modules/@414hustlerz/sidehusl-ui/package.json` to see what's actually installed.
- **Auth errors on publish** → Ensure `.npmrc` has a valid GitHub token with `write:packages` scope.
