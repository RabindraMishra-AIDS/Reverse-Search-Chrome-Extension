# Reverse Search Chrome Extension

Reverse Search is a Chrome extension that reverses a search query before sending it to a search engine.

For example:

- Original query: `what is apple`
- Reversed query: `elppa si tahw`

The extension provides three ways to perform a reverse search:

- A popup search box available from the Chrome toolbar.
- The Chrome address-bar keyword `reverse`.
- Optional on-page reversal support for supported search-engine websites.

## Why I started this project

The idea for this project came from a simple experience at a shoe shop. The people there used to tell or pronounce the shoe name in the opposite way. That made me curious, so I thought it would be interesting to search for words on Google in reverse order.

That small idea became Reverse Search: a lightweight browser extension that makes reverse searching quick and easy.

## What the project does

Reverse Search reverses the characters in a query and opens the result in a search engine. It supports searches through the extension popup and Chrome's supported omnibox keyword API.

### Search from Chrome's address bar

Chrome does not allow an extension to silently rewrite every ordinary address-bar search. Instead, Reverse Search uses Chrome's supported omnibox keyword API:

1. Focus Chrome's address bar with `Ctrl` + `L` on Windows/Linux or `Command` + `L` on macOS.
2. Type `reverse`, then press `Space` or `Tab`.
3. Enter your search query and press `Enter`.

For example, typing `reverse what is apple` searches Google for `elppa si tahw`.

You can also click the Reverse Search toolbar icon and enter a query in the popup search field. The reversed Google search opens in a new tab.

## Languages used

The project is built with the following web technologies:

| Language | Usage | Approximate share |
| --- | --- | ---: |
| JavaScript | Extension logic, popup behavior, omnibox integration, and page interaction | 57.2% |
| HTML | Popup and extension interface | 31.2% |
| CSS | Styling and layout | 11.6% |

The extension uses **Manifest V3** and does not require a backend server or external framework.

## Features

- Reverse search queries before submitting them.
- Search from the Chrome toolbar popup.
- Search from the address bar using the `reverse` keyword.
- Optional support for supported search-engine websites.
- Supports Google, Bing, Brave Search, DuckDuckGo, Ecosia, and Startpage.
- Reverses Unicode code points safely, including emoji and other non-BMP characters.
- Uses narrow host access and does not collect, store, or share user data.

## Install locally

1. Clone or download this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project folder.
6. Pin the extension to the toolbar if you want quick access to the popup.

After installation, you can use the toolbar popup or type `reverse` followed by a query in Chrome's address bar.

## Privacy and security

- The extension uses Manifest V3.
- It does not collect, transmit, store, or share user data.
- It does not use analytics.
- It does not record keystrokes.
- It does not use remote code.
- Host access is limited to supported search-engine domains.
- The website helper only changes a submitted search field.
- The popup and omnibox keyword use Chrome extension APIs instead of relying on changing search-engine page markup.

## Contributing

Contributions, suggestions, bug reports, and improvements are welcome.

### Steps to contribute

1. **Fork** this repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/Reverse-Search-Chrome-Extension.git
   cd Reverse-Search-Chrome-Extension
   ```

3. Create a feature branch:

   ```bash
   git checkout -b feature/your-change
   ```

4. Make your changes and test them by loading the extension through `chrome://extensions`.
5. Check that existing functionality still works, including the popup, the `reverse` omnibox keyword, and supported search-engine pages.
6. Commit your changes with a clear message:

   ```bash
   git add .
   git commit -m "Describe your change"
   ```

7. Push your branch to your fork:

   ```bash
   git push origin feature/your-change
   ```

8. Open a pull request against the `RabindraMishra-AIDS/Reverse-Search-Chrome-Extension` repository.

When adding support for another search engine, add only its exact HTTPS domain to `content_scripts.matches` in `manifest.json`. Avoid broad patterns such as `<all_urls>` so that permissions remain narrow and privacy-friendly.

## Publishing checklist

Before publishing the extension to the Chrome Web Store:

- Add 16×16, 48×48, and 128×128 PNG icons at:
  - `icons/icon16.png`
  - `icons/icon48.png`
  - `icons/icon128.png`
- Zip the contents of the project folder, not the enclosing folder.
- Upload the ZIP through the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
- Provide a privacy-policy page explaining that the extension changes search text locally and does not collect, store, transmit, or share user data.
- Add screenshots and a detailed store listing.
- Keep the store description aligned with the extension's actual behavior.

## License

No license has been specified for this project yet. If you would like others to reuse, modify, or redistribute the code, consider adding an appropriate open-source license file.
