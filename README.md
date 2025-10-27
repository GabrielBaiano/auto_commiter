# AI Commit Generator for VS Code

A VS Code extension that generates conventional commit messages using AI. Supports OpenAI, Anthropic (Claude), and Google (Gemini).

## 🚀 Features

- **AI-Powered Commit Messages**: Automatically generates clear, concise commit messages
- **Multiple AI Providers**: Supports OpenAI, Anthropic (Claude), and Google (Gemini)
- **Conventional Commits**: Follows the Conventional Commits specification by default
- **Secure**: API keys stored securely using VS Code's SecretStorage
- **Smart Context**: Analyzes file changes, branch name, and git diff
- **Editable**: Review and edit the AI-generated message before committing
- **Easy to Use**: Simple command or button click to generate commit messages

## 📦 Installation

### From Source (Development)

1. Clone this repository
2. Open in VS Code
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile:
   ```bash
   npm run compile
   ```
5. Press F5 to launch a new Extension Development Host window
6. The extension will be active in that window

### Building VSIX Package

```bash
npm install -g @vscode/vsce
vsce package
```

This creates a `.vsix` file that can be installed via:
- VS Code: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."

## ⚙️ Configuration

### 1. Set Your AI Provider

- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Run "AI Commit: Configure"
- Select your AI provider (OpenAI, Anthropic, or Google)
- Enter your API key

### 2. Configure Settings (Optional)

Open VS Code settings and search for "AI Commit" or edit `.vscode/settings.json`:

```json
{
  "aiCommit.provider": "openai",
  "aiCommit.model": "gpt-4o-mini",
  "aiCommit.useConventionalCommits": true,
  "aiCommit.includeFileNames": true,
  "aiCommit.maxDiffLength": 10000
}
```

#### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `aiCommit.provider` | AI provider: `openai`, `anthropic`, or `google` | `openai` |
| `aiCommit.model` | Model to use (e.g., `gpt-4o-mini`, `claude-3-5-sonnet-20241022`) | `gpt-4o-mini` |
| `aiCommit.useConventionalCommits` | Use Conventional Commits format (feat:, fix:, etc.) | `true` |
| `aiCommit.includeFileNames` | Include file names in AI prompt | `true` |
| `aiCommit.maxDiffLength` | Maximum diff length to send to AI (characters) | `10000` |

## 🎯 Usage

### Generate a Commit Message

1. Make changes to your code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Run "Generate Commit Message with AI"
4. Review and edit the AI-generated message if needed
5. Press Enter to commit

The extension will:
- Analyze your git diff
- Consider file names and branch context
- Generate a conventional commit message
- Show it for editing
- Commit with your confirmation

## 🧠 Supported AI Providers

### OpenAI
- Models: `gpt-4o-mini`, `gpt-4o`, `gpt-4`, `gpt-3.5-turbo`
- API Key: Get from https://platform.openai.com/api-keys

### Anthropic (Claude)
- Models: `claude-3-5-sonnet-20241022`, `claude-3-opus-20240229`, `claude-3-sonnet-20240229`
- API Key: Get from https://console.anthropic.com/

### Google (Gemini)
- Models: `gemini-pro`, `gemini-ultra`
- API Key: Get from https://makersuite.google.com/app/apikey

## 📝 Example Commit Messages

Generated messages follow the Conventional Commits format:

```
feat: add user authentication system

fix: resolve memory leak in data processor

chore: update dependencies to latest versions

docs: improve API documentation

refactor: simplify authentication logic

test: add unit tests for user service
```

## 🛠️ Development

### Project Structure

```
├── src/
│   ├── extension.ts      # Main extension entry point
│   ├── aiService.ts      # AI integration (OpenAI, Anthropic, Google)
│   ├── gitUtils.ts       # Git operations (diff, commit, etc.)
│   └── config.ts         # Configuration management
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
└── README.md
```

### Scripts

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm run lint` - Run ESLint
- `npm run vscode:prepublish` - Prepare for publishing

## 🔒 Security

- API keys are stored securely using VS Code's `SecretStorage` API
- Keys are never stored in plain text or committed to version control
- No data is sent to external services except the configured AI provider

## 🐛 Troubleshooting

### "No changes detected"
- Make sure you've saved your files
- Check if you have staged or unstaged changes in git

### "API key not configured"
- Run "AI Commit: Configure" command
- Enter your API key
- Make sure the provider matches your API key type

### "Not a git repository"
- Open a folder that contains a git repository
- Initialize git with `git init` if needed

### Errors with AI API
- Check your API key is valid
- Verify your model name is correct for the provider
- Check your API quota/credits
- See the "Output" panel for detailed error messages

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 🙏 Acknowledgments

- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- Git operations powered by [simple-git](https://github.com/steveukx/git-js)
- Inspired by the need for better commit messages

---

**Made with ❤️ to make git commits easier and more meaningful**
