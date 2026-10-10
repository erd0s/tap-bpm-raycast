# Tap BPM for Raycast

A small Raycast extension for finding a beat's tempo by tapping the space bar.

## Use it

1. Open **Tap BPM** in Raycast. The Tap field is focused automatically.
2. Press **Space** in time with the beat. A BPM reading appears after the second tap and updates as you continue.
3. Press **⌘R** to clear the reading, or pause for more than three seconds to start a new count with your next tap.

The action menu also lets you copy the BPM. Raycast closes the window when you dismiss it.

The reading uses up to eight recent taps, which lets it follow tempo changes. Key events less than 120 ms apart are ignored to avoid counting a held key's repeats.

## Install from source

This extension is available from this repository for local use; it is not listed in the Raycast Store.

You need Raycast on macOS and Node.js with npm. Then run:

```sh
git clone git@github.com:erd0s/tap-bpm-raycast.git
cd tap-bpm-raycast
npm install
npm run dev
```

Raycast will register the development command. Search for **Tap BPM** in Raycast to open it. Keep `npm run dev` running while developing; it rebuilds when the source changes.

## Check the project

```sh
npm run typecheck
npm test
npm run lint
npm run build
```

The extension uses Raycast's local UI API. It makes no network requests and has no accounts or preferences.

## License

MIT. See [LICENSE](LICENSE).
