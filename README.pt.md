<p align="center">
  <!-- <img src="[LOGO_PATH]" alt="Logo do Auto Commiter" width="200"/> -->
</p>

<h1 align="center">Auto Commiter (para VS Code)</h1>

<p align="center">
  <strong>Uma extensão do VS Code que usa IA para gerar mensagens de commit.</strong><br>
  <em>Deixe a IA escrever suas mensagens de commit direto no editor.</em>
</p>

<p align="center">
  <a href="/README.md" target="_blank">🇺🇸 English</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://marketplace.visualstudio.com/items?itemName=gabrielbaiano.auto-commiter" target="_blank">📦 VS Marketplace</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://open-vsx.org/extension/gabrielbaiano/ai-commit" target="_blank">🧰 Open VSX</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GabrielBaiano/auto_commiter/issues/new/choose" target="_blank">🐛 Reportar Bug</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=gabrielbaiano.auto-commiter">
    <img src="https://img.shields.io/visual-studio-marketplace/v/gabrielbaiano.auto-commiter?style=social&label=VS%20Marketplace" alt="Versão no VS Marketplace">
  </a>
  <a href="https://open-vsx.org/extension/gabrielbaiano/ai-commit">
    <img src="https://img.shields.io/open-vsx/v/gabrielbaiano/ai-commit?label=Open%20VSX&style=social" alt="Versão no Open VSX">
  </a>
  <a href="https://github.com/GabrielBaiano/auto_commiter/stargazers">
    <img src="https://img.shields.io/github/stars/GabrielBaiano/auto_commiter?style=social" alt="Estrelas no GitHub">
  </a>
  <a href="https://github.com/GabrielBaiano/auto_commiter/issues">
    <img src="https://img.shields.io/github/issues/GabrielBaiano/auto_commiter" alt="Issues no GitHub">
  </a>
  <a href="https://github.com/GabrielBaiano/auto_commiter/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/GabrielBaiano/auto_commiter" alt="Licença">
  </a>
</p>

---

<!-- <p align="center">
  <img src="[SHOWCASE_IMAGE_URL]" alt="Demonstração do Auto Commiter no VS Code"/>
</p> -->

**Auto Commiter** é uma extensão do VS Code que analisa seu `git diff --staged` e usa IA generativa (OpenAI, Claude ou Google Gemini) para criar automaticamente mensagens de commit descritivas e precisas, integrando-se diretamente ao painel de Controle de Código-Fonte.

> 📚 **Evolução do Projeto**: Este projeto foi criado para agilizar o fluxo de desenvolvimento, economizando tempo e melhorando a qualidade do histórico de commits ao aproveitar o poder de modelos modernos de IA dentro do editor de código.

## 🎓 Funcionalidades Principais

- **Commits com IA**: Gera automaticamente mensagens de commit com base nas alterações preparadas (staged).
- **Suporte a múltiplos provedores**: Escolha entre modelos da OpenAI (GPT), Google (Gemini) ou Claude AI.
- **Integração com VS Code**: Preenche a caixa de mensagem de commit no painel de Controle de Código-Fonte.
- **Paleta de Comandos**: Acesse rapidamente via a Paleta de Comandos do VS Code (Ctrl+Shift+P).

## 🤖 Como Funciona e Modelos Suportados

### Como Funciona

1. A extensão é ativada quando você abre um repositório Git no VS Code.
2. Após preparar suas alterações (`git add .`), vá ao painel **Controle de Código-Fonte**.
3. Clique no ícone "Auto Commiter" (ou execute o comando) para gerar uma mensagem.
4. A extensão envia com segurança seu `git diff --staged` para o provedor de IA escolhido (OpenAI, Claude ou Gemini).
5. A IA analisa as mudanças no código e retorna uma sugestão de mensagem de commit.
6. A mensagem gerada é colocada automaticamente na caixa de entrada do commit, pronta para você revisar e confirmar.

### Modelos de IA Suportados

Você pode escolher entre os seguintes modelos nas configurações da extensão:

- **OpenAI:**
    - `gpt-3.5-turbo`
    - `gpt-4`
    - `gpt-4-turbo`
- **Anthropic Claude:**
    - `claude-3-5-sonnet-20241022`
    - `claude-3-5-haiku-20241022`
    - `claude-3-opus-20240229`
    - `claude-3-sonnet-20240229`
    - `claude-3-haiku-20240307`
- **Google Gemini:**
    - `gemini-1.0-pro`
    - `gemini-1.5-pro-latest`

## 🛠️ Tecnologias Utilizadas

- **Ambiente**: Visual Studio Code
- **Linguagem**: TypeScript (ou JavaScript)
- **API**: VS Code Extension API
- **Integração com IA**: OpenAI API, Google Gemini API

## 🚀 Início Rápido

### 📥 Instalação

1. Abra o **Visual Studio Code**.
2. Vá até a visão de **Extensões** (ou pressione `Ctrl+Shift+X`).
3. Pesquise por "**Auto Commiter**".
4. Clique em **Instalar**.

*Como alternativa, abra o Quick Open do VS Code (`Ctrl+P`), cole o comando abaixo e pressione Enter:*

## 🧭 Comandos e Uso

- **Botão na Barra de Status**: Clique no botão "AI Commit" na barra inferior do VS Code para gerar a mensagem.
- **Paleta de Comandos**:
  - "AI Commit: Generate Commit Message with AI" (`aiCommit.generate`)
  - "AI Commit: Configure AI Commit" (`aiCommit.configure`) — define provedor, chave de API e modelo

## 🌐 Idioma das Mensagens de Commit

- Vá em Configurações → pesquise por "AI Commit" → defina **Language**.
- Valores suportados: `pt`, `en`, `es`, `fr`, `de`, `it` (padrão: `pt`).
- Alternativamente, no `settings.json`:
  ```json
  {
    "aiCommit.language": "en"
  }
  ```

## 📄 Licença

Este projeto é licenciado sob a Licença MIT.
