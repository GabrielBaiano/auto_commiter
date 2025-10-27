<p align="center">
  <h1 align="center">AI Commit Generator</h1>
</p>

<p align="center">
  <strong>VS Code extension that generates conventional commit messages using AI (OpenAI, Claude, or Gemini)</strong><br>
  <em>Automate your git commits with intelligent AI-powered messages</em>
</p>

<p align="center">
  <a href="https://github.com/GabrielBaiano/auto_commiter/issues" target="_blank">🐛 Report Bug</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GabrielBaiano/auto_commiter" target="_blank">💻 GitHub</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/GabrielBaiano/auto_commiter?style=social" alt="GitHub stars">
  <img src="https://img.shields.io/github/issues/GabrielBaiano/auto_commiter" alt="GitHub issues">
  <img src="https://img.shields.io/github/license/GabrielBaiano/auto_commiter" alt="License">
</p>

---

**AI Commit Generator** is a powerful VS Code extension that automatically generates commit messages for your git changes using AI. Whether you're working on features, bug fixes, refactoring, or documentation, the extension analyzes your code changes and generates clear, conventional commit messages in the language of your choice.

> 📚 **Project Evolution**: This extension uses multiple AI providers (OpenAI, Anthropic's Claude, and Google's Gemini) to analyze your git diffs and generate human-readable commit messages that follow the Conventional Commits specification.

## 🎓 Main Features

* **Multi-AI Provider Support**: Choose between OpenAI (GPT-4, GPT-3.5), Anthropic (Claude 3.5), or Google (Gemini Pro)
* **Conventional Commits**: Automatically generates commit messages following the Conventional Commits specification (feat, fix, chore, docs, refactor, etc.)
* **Multi-Language Support**: Generate commit messages in Portuguese, English, Spanish, French, German, or Italian
* **Smart Context Analysis**: Analyzes your git diff to understand what changed and why
* **Configurable**: Customize model selection, commit format, and more through settings

## 🛠️ Technologies Used

* **Framework**: VS Code Extension API
* **Language**: TypeScript
* **Git Integration**: simple-git library for Git operations
* **HTTP Client**: Axios for API requests
* **AI Providers**: OpenAI API, Anthropic API, Google Gemini API
* **Libraries**: @types/vscode, @types/node, axios, simple-git

## 🚀 Quick Start

### 📥 Installation

1. **Install from VS Code**: Search for "AI Commit Generator" in the VS Code Extensions marketplace
2. **Configure AI Provider**: Run the command "AI Commit: Configure" to set up your preferred AI provider
3. **Set API Key**: Enter your API key for your chosen provider (OpenAI, Anthropic, or Google)
4. **Start Using**: Use the "Generate Commit Message with AI" command when you have changes to commit

### ⚡ First Steps

- **Open a Git Repository**: Make sure you're in a project with git initialized
- **Make Some Changes**: Edit your code and save the files
- **Run the Command**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and type "AI Commit: Generate Commit Message"
- **Review & Edit**: The AI will generate a commit message that you can review and edit before committing

## 🌐 Configuration

AI Commit Generator allows you to customize its behavior through VS Code settings:

### Method 1: Using VS Code Settings UI

1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "AI Commit"
3. Configure the following settings:
   - **Provider**: Choose your AI provider (openai, anthropic, google)
   - **Model**: Specify the model to use (e.g., gpt-4o-mini, claude-3-5-sonnet-20241022, gemini-2.0-flash)
   - **Use Conventional Commits**: Enable/disable conventional commits format
   - **Include File Names**: Include file names in the AI context
   - **Max Diff Length**: Maximum length of diff to send (default: 10000 characters)
   - **Language**: Choose the language for commit messages (pt, en, es, fr, de, it)

### Method 2: Using settings.json

Add these configurations to your `settings.json`:

```json
{
  "aiCommit.provider": "openai",
  "aiCommit.model": "gpt-4o-mini",
  "aiCommit.useConventionalCommits": true,
  "aiCommit.includeFileNames": true,
  "aiCommit.maxDiffLength": 10000,
  "aiCommit.language": "pt"
}
```

### Supported AI Providers and Models:

- **OpenAI**: gpt-4o-mini, gpt-4o, gpt-4-turbo, gpt-3.5-turbo
- **Anthropic (Claude)**: claude-3-5-sonnet-20241022, claude-3-opus, claude-3-sonnet
- **Google (Gemini)**: gemini-2.0-flash, gemini-1.5-pro, gemini-1.5-flash

## 💻 For Developers

If you want to clone the repository and run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/GabrielBaiano/auto_commiter.git

# 2. Navigate to the project folder
cd auto_commiter

# 3. Install dependencies
npm install

# 4. Compile TypeScript to JavaScript
npm run compile

# 5. Press F5 to open a new VS Code window with the extension loaded

# 6. To package the extension
npm run vscode:prepublish
```

## 📚 Perfect for Developers

- **Productivity Boost**: Never waste time writing commit messages again
- **Consistent Commits**: Maintain consistent commit message format across your team
- **International Teams**: Generate commits in multiple languages
- **Learning Tool**: Learn how to write better commit messages by seeing AI-generated examples

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/GabrielBaiano" target="_blank">Gabriel Baiano</a>
</p>

