<p align="center">
  <!-- <img src="[LOGO_PATH]" alt="Auto Commiter Logo" width="200"/> -->
</p>

<h1 align="center">Auto Commiter (for VS Code)</h1>

<p align="center">
  <strong>A VS Code extension that uses AI to generate commit messages.</strong><br>
  <em>Let AI write your commit messages directly in your editor.</em>
</p>

<p align="center">
  <a href="/README.pt.md" target="_blank">🇧🇷 Português</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://marketplace.visualstudio.com/items?itemName=gabrielbaiano.auto-commiter" target="_blank">📦 VS Marketplace</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://open-vsx.org/extension/gabrielbaiano/ai-commit" target="_blank">🧰 Open VSX</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GabrielBaiano/auto_commiter/issues/new/choose" target="_blank">🐛 Report Bug</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=gabrielbaiano.auto-commiter">
    <img src="https://img.shields.io/visual-studio-marketplace/v/gabrielbaiano.auto-commiter?style=social&label=VS%20Marketplace" alt="VS Marketplace Version">
  </a>
  <a href="https://open-vsx.org/extension/gabrielbaiano/ai-commit">
    <img src="https://img.shields.io/open-vsx/v/gabrielbaiano/ai-commit?label=Open%20VSX&style=social" alt="Open VSX Version">
  </a>
  <a href="https://github.com/GabrielBaiano/auto_commiter/stargazers">
    <img src="https://img.shields.io/github/stars/GabrielBaiano/auto_commiter?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/GabrielBaiano/auto_commiter/issues">
    <img src="https://img.shields.io/github/issues/GabrielBaiano/auto_commiter" alt="GitHub issues">
  </a>
  <a href="https://github.com/GabrielBaiano/auto_commiter/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/GabrielBaiano/auto_commiter" alt="License">
  </a>
</p>

---

<!-- <p align="center">
  <img src="[SHOWCASE_IMAGE_URL]" alt="Auto Commiter Showcase in VS Code"/>
</p> -->

**Auto Commiter** is a VS Code extension that analyzes your `git diff --staged` and uses generative AI (OpenAI or Google Gemini) to automatically create descriptive and accurate commit messages, integrating directly into your Source Control panel.

> 📚 **Project Evolution**: This project was created to streamline the development workflow, saving time and improving the quality of commit history by leveraging the power of modern AI models inside the code editor.

## 🎓 Main Features

* **AI-Powered Commits**: Automatically generates commit messages based on staged changes.
* **Multi-Provider Support**: Choose between OpenAI (GPT), Google (Gemini) models or Claude AI.
* **VS Code Integration**: Populates the commit message box in the Source Control panel.
* **Command Palette**: Access functionality quickly via the VS Code Command Palette (Ctrl+Shift+P).

## 🤖 How It Works & Supported Models

### How It Works

1.  The extension activates when you open a Git repository in VS Code.
2.  After staging your changes (`git add .`), go to the **Source Control** panel.
3.  Click the "Auto Commiter" icon (or run the command) to generate a message.
4.  The extension securely sends your `git diff --staged` to your chosen AI provider (OpenAI, Claude, or Gemini).
5.  The AI analyzes the code changes and returns a suggested commit message.
6.  The generated message is automatically placed in the commit input box, ready for you to review and commit.

## Commands & Usage

- **Status Bar Button**: Click the "AI Commit" button on the VS Code status bar to generate a message.
- **Command Palette**:
  - "AI Commit: Generate Commit Message with AI" (`aiCommit.generate`)
  - "AI Commit: Configure AI Commit" (`aiCommit.configure`) — set provider, API key, and model

## Commit Message Language

- Go to Settings → search for "AI Commit" → set **Language**.
- Supported values: `pt`, `en`, `es`, `fr`, `de`, `it` (default: `pt`).
- Alternatively, set in `settings.json`:
  ```json
  {
    "aiCommit.language": "en"
  }
  ```

### Supported AI Models

You can choose from the following models in the extension's settings:

* **OpenAI:**
    * `gpt-3.5-turbo`
    * `gpt-4`
    * `gpt-4-turbo`
* **Anthropic Claude:**
    * `claude-3-5-sonnet-20241022`
    * `claude-3-5-haiku-20241022`
    * `claude-3-opus-20240229`
    * `claude-3-sonnet-20240229`
    * `claude-3-haiku-20240307`
* **Google Gemini:**
    * `gemini-1.0-pro`
    * `gemini-1.5-pro-latest`

## 🛠️ Technologies Used

* **Environment**: Visual Studio Code
* **Language**: TypeScript (or JavaScript)
* **API**: VS Code Extension API
* **AI Integration**: OpenAI API, Google Gemini API

## 🚀 Quick Start

### 📥 Installation

1.  Open **Visual Studio Code**.
2.  Go to the **Extensions** view (or press `Ctrl+Shift+X`).
3.  Search for "**Auto Commiter**".
4.  Click **Install**.

*Alternatively, launch VS Code Quick Open (`Ctrl+P`), paste the following command, and press enter:*

## 📄 License

This project is licensed under the MIT License.
