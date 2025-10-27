import axios, { AxiosInstance } from 'axios';
import { Config } from './config';

export class AIService {
  private apiKey: string;
  private provider: 'openai' | 'anthropic' | 'google';
  private client: AxiosInstance;

  constructor(apiKey: string, provider: 'openai' | 'anthropic' | 'google') {
    this.apiKey = apiKey;
    this.provider = provider;
    this.client = axios.create({
      timeout: 30000,
      headers: this.getHeaders()
    });
  }

  private getHeaders(): Record<string, string> {
    switch (this.provider) {
      case 'openai':
        return {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        };
      case 'anthropic':
        return {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        };
      case 'google':
        return {
          'Content-Type': 'application/json'
        };
      default:
        return {};
    }
  }

  async generateCommitMessage(diff: string, fileNames: string[], branchName: string, useConventionalCommits: boolean, language: string): Promise<string> {
    const prompt = this.buildPrompt(diff, fileNames, branchName, useConventionalCommits, language);
    
    switch (this.provider) {
      case 'openai':
        return this.generateWithOpenAI(prompt);
      case 'anthropic':
        return this.generateWithAnthropic(prompt);
      case 'google':
        return this.generateWithGoogle(prompt);
      default:
        throw new Error(`Unsupported provider: ${this.provider}`);
    }
  }

  private buildPrompt(diff: string, fileNames: string[], branchName: string, useConventionalCommits: boolean, language: string): string {
    const maxLength = Config.getMaxDiffLength();
    const truncatedDiff = diff.length > maxLength 
      ? diff.substring(0, maxLength) + '\n\n... (diff truncated)'
      : diff;

    const languageNames: { [key: string]: string } = {
      'pt': 'Portuguese (pt-BR)',
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian'
    };

    const langName = languageNames[language] || 'Portuguese';

    let prompt = `You are an expert at writing git commit messages.

IMPORTANT: Write the commit message in ${langName}.

Rules:
- Write in ${useConventionalCommits ? 'Conventional Commits format (e.g., feat:, fix:, chore:, docs:, refactor:, test:)' : 'a clear and concise format'}
- Use present tense (e.g., "add" not "added")
- Be specific and descriptive but concise
- Focus on what changed and why (if relevant)
- Keep the first line under 50 characters if possible
${useConventionalCommits ? '- Use appropriate type: feat (new feature), fix (bug fix), chore (maintenance), docs (documentation), refactor (code refactoring), test (tests), style (formatting), perf (performance)' : ''}

Context:
- Branch: ${branchName}
- Files changed: ${fileNames.join(', ')}

Git diff:
\`\`\`
${truncatedDiff}
\`\`\`

Generate a commit message for these changes in ${langName}. Only return the commit message text, nothing else.`;

    return prompt;
  }

  private async generateWithOpenAI(prompt: string): Promise<string> {
    const model = Config.getModel();
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await this.client.post(url, {
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at writing clear and concise git commit messages.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 200
      });

      return response.data.choices[0].message.content.trim();
    } catch (error: any) {
      if (error.response) {
        throw new Error(`OpenAI API error: ${error.response.data.error?.message || error.message}`);
      }
      throw new Error(`Failed to generate commit message: ${error.message}`);
    }
  }

  private async generateWithAnthropic(prompt: string): Promise<string> {
    const model = Config.getModel();
    const url = 'https://api.anthropic.com/v1/messages';

    try {
      const response = await this.client.post(url, {
        model: model,
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      return response.data.content[0].text.trim();
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Anthropic API error: ${error.response.data.error?.message || error.message}`);
      }
      throw new Error(`Failed to generate commit message: ${error.message}`);
    }
  }

  private async generateWithGoogle(prompt: string): Promise<string> {
    const model = Config.getModel();
    // Ensure model is a valid Gemini model name (without v1beta/v1 prefix if present)
    const cleanModel = model.replace(/^models\//, '').replace(/^v1beta\/models\//, '').replace(/^v1\/models\//, '');
    // Use v1 API for newer models like gemini-2.0-flash
    const apiVersion = model.includes('gemini-2.0') ? 'v1' : 'v1beta';
    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${cleanModel}:generateContent?key=${this.apiKey}`;

    try {
      const response = await axios.post(url, {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 200
        }
      });

      return response.data.candidates[0].content.parts[0].text.trim();
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error?.message || error.message;
        const errorDetails = error.response.data?.error ? JSON.stringify(error.response.data.error) : '';
        throw new Error(`Google API error: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ''}`);
      }
      throw new Error(`Failed to generate commit message: ${error.message}`);
    }
  }

  static async create(): Promise<AIService> {
    const apiKey = await Config.getApiKey();
    if (!apiKey) {
      throw new Error('API key not configured. Please run "AI Commit: Configure" command.');
    }

    const provider = Config.getProvider();
    return new AIService(apiKey, provider);
  }
}

