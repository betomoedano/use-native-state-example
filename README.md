# useNativeState vs useState (Expo UI, Android)

A minimal Expo app that shows the difference between a `TextField` whose value
is mirrored into React `useState` on every keystroke and one that keeps its
value on the native side via `useNativeState` from `@expo/ui/jetpack-compose`.

> You can test this in Expo Go SDK 56

Open [`src/app/index.tsx`](src/app/index.tsx) — two cards, side by side:

- **Mirrored into useState** — `onValueChange` writes each keystroke into a
  `useState`, re-rendering the component for every character.
- **useNativeState only** — the value stays in the native `TextField`. No
  re-renders while typing. Read `.value` on demand when you need it in JS.

Read the write-up for the full explanation:
👉 https://codewithbeto.dev/blog/use-native-state-expo-ui

## Run it

```bash
bun install
bun start
```

This example targets Android (`@expo/ui/jetpack-compose`).
