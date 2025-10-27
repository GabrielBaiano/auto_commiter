<h1 align="center">AI Commit Generator</h1>

<p align="center">
  <strong>Generate Conventional Commit Messages with AI</strong><br>
  <em>VS Code extension powered by OpenAI, Claude, or Gemini</em>
</p>

<p align="center">
  <a href="https://github.com/yourusername/auto_commiter/issues">
    <img src="https://img.shields.io/github/issues/yourusername/auto_commiter" alt="GitHub issues">
  </a>
  <a href="https://github.com/yourusername/auto_commiter/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/yourusername/auto_commiter" alt="License">
  </a>
  <a href="https://github.com/yourusername/auto_commiter/releases">
    <img src="https://img.shields.io/github/v/release/yourusername/auto_commiter" alt="Latest Release">
  </a>
</p>

---

**AI Commit Generator** é uma extensão para VS Code que gera mensagens de commit convencionais usando IA. Suporta múltiplos provedores de IA (OpenAI, Anthropic Claude, Google Gemini) e permite que você configure o idioma e o formato das mensagens.

## 🎓 Funcionalidades Principais

* **Geração Automática**: Analisa suas mudanças e gera commits profissionais automaticamente
* **Múltiplos Provedores**: Suporte para OpenAI, Claude (Anthropic) e Gemini (Google)
* **Múltiplos Idiomas**: Português, Inglês, Espanhol, Francês, Alemão e Italiano
* **Conventional Commits**: Formato padronizado (feat:, fix:, chore:, etc.)
* **Armazenamento Seguro**: API keys armazenadas com SecretStorage do VS Code
* **Editável**: Revise e edite mensagens antes de commitar

## 🛠️ Tecnologias Utilizadas

* **Framework**: VS Code Extension API
* **Linguagem**: TypeScript
* **APIs**: OpenAI, Anthropic, Google Gemini
* **Git**: simple-git para operações Git
* **Bibliotecas**: axios, vscode

## 📖 Como Usar e Instalar

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/GabrielBaiano/auto_commiter.git
cd auto_commiter
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o projeto:
```bash
npm run compile
```

4. Execute em modo debug (F5 no VS Code)

### Configuração

1. Pressione `Ctrl+Shift+P` e execute "AI Commit: Configure"
2. Selecione seu provedor de IA (OpenAI, Anthropic ou Google)
3. Insira sua API key
4. Configure o modelo e idioma desejado

### Uso

1. Faça alterações no seu código
2. Pressione `Ctrl+Shift+P` → "Generate Commit Message with AI"
3. Escolha se deseja fazer `git add .`
4. Revise e edite a mensagem se necessário
5. Confirme para commitar

## ⚙️ Configurações

Edite `settings.json`:

```json
{
  "aiCommit.provider": "google",
  "aiCommit.model": "gemini-2.0-flash",
  "aiCommit.language": "pt",
  "aiCommit.useConventionalCommits": true,
  "aiCommit.includeFileNames": true,
  "aiCommit.maxDiffLength": 10000
}
```

## 💻 Para Desenvolvedores

```bash
# Instalar dependências
npm install

# Compilar TypeScript
npm run compile

# Watch mode (compila automaticamente)
npm run watch

# Executar testes
npm test
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

---

<p align="center">
  Feito com ❤️ por <a href="https://github.com/GabrielBaiano" target="_blank">GabrielBaiano</a> para facilitar commits profissionais
</p>
