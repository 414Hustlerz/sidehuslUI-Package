# CLAUDE.md

## Publishing

When the user says **"publish patch"**, **"publish minor"**, or **"publish major"**, run:

```bash
npm version <action> && npm publish
```

Where `<action>` is `patch`, `minor`, or `major` as specified by the user.

- `patch` — small fixes / additions (0.4.9 → 0.4.10)
- `minor` — new features (0.4.9 → 0.5.0)
- `major` — breaking changes (0.4.9 → 1.0.0)

After publishing, remind the user to update consuming apps:
```bash
yarn add @414hustlerz/sidehusl-ui@latest && npx expo start --clear
```
