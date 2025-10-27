import * as vscode from 'vscode';

export class Config {
  private static context: vscode.ExtensionContext;

  static initialize(context: vscode.ExtensionContext) {
    this.context = context;
  }

  static async getApiKey(): Promise<string | undefined> {
    const provider = this.getProvider();
    const keyName = `aiCommit.${provider}.apiKey`;
    
    // Try to get from secure storage first
    const stored = await this.context.secrets.get(keyName);
    if (stored) {
      return stored;
    }

    // Fallback to workspace configuration
    const config = vscode.workspace.getConfiguration('aiCommit');
    const apiKey = config.get<string>(`${provider}.apiKey`);
    
    // If found in config, migrate to secure storage
    if (apiKey) {
      await this.context.secrets.store(keyName, apiKey);
      return apiKey;
    }

    return undefined;
  }

  static async setApiKey(apiKey: string): Promise<void> {
    const provider = this.getProvider();
    const keyName = `aiCommit.${provider}.apiKey`;
    await this.context.secrets.store(keyName, apiKey);
  }

  static getProvider(): 'openai' | 'anthropic' | 'google' {
    const config = vscode.workspace.getConfiguration('aiCommit');
    return config.get<'openai' | 'anthropic' | 'google'>('provider', 'openai');
  }

  static getModel(): string {
    const config = vscode.workspace.getConfiguration('aiCommit');
    const provider = this.getProvider();
    const configuredModel = config.get<string>('model');
    
    // If model is explicitly configured, use it
    if (configuredModel) {
      return configuredModel;
    }
    
    // Otherwise, return default model for the selected provider
    switch (provider) {
      case 'openai':
        return 'gpt-4o-mini';
      case 'anthropic':
        return 'claude-3-5-sonnet-20241022';
      case 'google':
        return 'gemini-2.0-flash';
      default:
        return 'gpt-4o-mini';
    }
  }

  static shouldUseConventionalCommits(): boolean {
    const config = vscode.workspace.getConfiguration('aiCommit');
    return config.get<boolean>('useConventionalCommits', true);
  }

  static shouldIncludeFileNames(): boolean {
    const config = vscode.workspace.getConfiguration('aiCommit');
    return config.get<boolean>('includeFileNames', true);
  }

  static getMaxDiffLength(): number {
    const config = vscode.workspace.getConfiguration('aiCommit');
    return config.get<number>('maxDiffLength', 10000);
  }

  static getLanguage(): string {
    const config = vscode.workspace.getConfiguration('aiCommit');
    return config.get<string>('language', 'pt');
  }

  static async promptForApiKey(): Promise<string | undefined> {
    const provider = this.getProvider();
    const providerName = provider === 'openai' ? 'OpenAI' : 
                         provider === 'anthropic' ? 'Anthropic (Claude)' : 
                         'Google (Gemini)';

    const apiKey = await vscode.window.showInputBox({
      prompt: `Enter your ${providerName} API key`,
      password: true,
      ignoreFocusOut: true,
      placeHolder: 'sk-... or your API key',
      validateInput: (value) => {
        if (!value || value.trim().length === 0) {
          return 'API key is required';
        }
        return null;
      }
    });

    if (apiKey) {
      await this.setApiKey(apiKey);
      vscode.window.showInformationMessage(`✅ API key saved for ${providerName}`);
    }

    return apiKey;
  }
}

