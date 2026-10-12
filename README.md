# Reverse Search

A Chrome extension that reverses a search query. For example, entering `what is apple` sends `elppa si tahw` to the search engine.

## Search from Chrome's address bar

Chrome does not allow an extension to silently rewrite every ordinary address-bar search. Instead, Reverse Search uses Chrome's supported omnibox keyword API:

1. Focus Chrome's address bar (`Ctrl` + `L`).
2. Type `reverse`, then press Space or Tab.
3. Type your query and press Enter.

For example, `reverse what is apple` searches Google for `elppa si tahw`. This route does not depend on Google page markup.

You can also click the Reverse Search toolbar icon and use its popup search field. It has the same reliable behavior and opens the reversed Google search in a new tab.

## Install locally

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select this folder.
4. Search on Google, Bing, Brave Search, DuckDuckGo, Ecosia, or Startpage.

## Publishing checklist

- Create 16×16, 48×48, and 128×128 PNG icons at `icons/icon16.png`, `icons/icon48.png`, and `icons/icon128.png` before uploading. Chrome Web Store requires a 128px icon.
- Zip the folder contents (not the enclosing folder) and upload it through the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
- Use a privacy-policy page that states: the extension changes search text locally, does not transmit, collect, store, or share user data, and has no analytics.
- Supply screenshots and a detailed-store listing. Keep the description aligned with the extension's actual behavior.

## Security and privacy choices

- Manifest V3, no remotely hosted code, no data collection, and no broad permissions.
- Host access is limited to six search-engine domains; it cannot read pages elsewhere.
- The website helper only changes a submitted search field. It does not record keystrokes or use storage.
- The popup and omnibox keyword use Chrome extension APIs rather than a search engine's changing page UI.
- Unicode code points are reversed safely, so emoji and other non-BMP characters are not corrupted.

## Contributing

Contributions are welcome and appreciated—help us take Reverse Search to the next level.

### Local setup

1. Clone this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the cloned folder.
5. Test supported search flows: popup search, omnibox keyword (`reverse` + Space/Tab), and website flows on supported engines.

### Contribution workflow

1. Create a focused branch for one improvement or fix.
2. Make your changes and manually verify behavior in Chrome.
3. Update related documentation when behavior or support changes.
4. Commit with a clear, descriptive message.
5. Open a pull request.

### Good areas to contribute

- Add or improve search-engine support.
- Improve popup and omnibox UX.
- Improve accessibility and keyboard navigation.
- Strengthen Unicode/reversal edge-case handling.
- Add or improve tests.
- Improve docs, examples, and contributor guidance.
- Improve icons and Chrome Web Store assets.
- Review privacy/security boundaries.
- Improve browser compatibility where feasible.

### Pull request expectations

- Explain the problem and your solution clearly.
- Include what you tested and how.
- Keep changes focused and avoid unrelated refactors.
- Avoid broad host permissions or any user-data collection.

### Code quality and security

Please keep contributions aligned with this project's baseline: Manifest V3, no remotely hosted code, narrow host permissions, and no analytics or user-data collection.

If you have ideas, questions, or proposals, open an issue or start a discussion—we'd love to collaborate.

## Extending support

To support another search engine, add its exact HTTPS domain to `content_scripts.matches` in `manifest.json`. Keep the list narrow: broad patterns such as `<all_urls>` make the privacy review and Web Store approval harder. Add an integration test against the site before publishing because individual engines can change their form markup.
