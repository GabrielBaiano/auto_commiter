import * as vscode from 'vscode';
import { Config } from './config';
import { GitUtils, GitChangeInfo } from './gitUtils';
import { AIService } from './aiService';

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  Config.initialize(context);

  outputChannel = vscode.window.createOutputChannel('AI Commit');
  outputChannel.appendLine('AI Commit extension activated');

  // Register the main command
  const generateCommand = vscode.commands.registerCommand('aiCommit.generate', async () => {
    await handleGenerateCommand();
  });

  // Register the configure command
  const configureCommand = vscode.commands.registerCommand('aiCommit.configure', async () => {
    await handleConfigureCommand();
  });

  context.subscriptions.push(generateCommand, configureCommand, outputChannel);
}

async function handleConfigureCommand() {
  // Show provider selection
  const provider = await vscode.window.showQuickPick(
    [
      { label: 'OpenAI', value: 'openai', description: 'GPT-4, GPT-3.5, etc.' },
      { label: 'Anthropic (Claude)', value: 'anthropic', description: 'Claude 3, Claude 3.5 Sonnet' },
      { label: 'Google (Gemini)', value: 'google', description: 'Gemini Pro, Gemini Ultra' }
    ],
    {
      placeHolder: 'Select an AI provider',
      canPickMany: false
    }
  );

  if (!provider) {
    return;
  }

  // Update provider setting
  await vscode.workspace.getConfiguration('aiCommit').update('provider', provider.value, true);

  // Prompt for API key
  const apiKey = await vscode.window.showInputBox({
    prompt: `Enter your ${provider.label} API key`,
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
    await Config.setApiKey(apiKey);
    vscode.window.showInformationMessage(`✅ API key saved for ${provider.label}`);
  }

  // Optionally ask for model
  const model = await vscode.window.showInputBox({
    prompt: `Enter the model name (or press Enter for default)`,
    ignoreFocusOut: true,
    placeHolder: provider.value === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-sonnet-20241022'
  });

  if (model && model.trim().length > 0) {
    await vscode.workspace.getConfiguration('aiCommit').update('model', model, true);
  }
}

async function handleGenerateCommand() {
  try {
    // Check if we're in a git repository
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      vscode.window.showErrorMessage('No workspace folder open');
      return;
    }

    const git = new GitUtils(workspaceRoot);
    
    // Check if it's a git repo
    const isRepo = await git.isGitRepo();
    if (!isRepo) {
      vscode.window.showErrorMessage('Not a git repository');
      return;
    }

    // Check for changes
    const hasChanges = await git.hasChanges();
    if (!hasChanges) {
      vscode.window.showWarningMessage('No changes detected to commit');
      return;
    }

    // Check for API key
    let apiKey = await Config.getApiKey();
    if (!apiKey) {
      const shouldConfigure = await vscode.window.showWarningMessage(
        'API key not configured. Would you like to configure it now?',
        'Configure',
        'Cancel'
      );

      if (shouldConfigure === 'Configure') {
        apiKey = await Config.promptForApiKey();
        if (!apiKey) {
          return;
        }
      } else {
        return;
      }
    }

    // Show progress
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Generating commit message with AI',
        cancellable: false
      },
      async (progress) => {
        progress.report({ increment: 0, message: 'Collecting changes...' });

        // Get git changes
        const changeInfo = await git.getChangeInfo();
        
        if (!changeInfo.diff || changeInfo.diff.trim().length === 0) {
          vscode.window.showWarningMessage('No changes detected');
          return;
        }

        progress.report({ increment: 30, message: 'Analyzing with AI...' });

        // Generate commit message
        const aiService = await AIService.create();
        const useConventionalCommits = Config.shouldUseConventionalCommits();
        const shouldIncludeFileNames = Config.shouldIncludeFileNames();
        
        const fileNames = shouldIncludeFileNames ? changeInfo.fileNames : [];
        
        outputChannel.appendLine('\n--- Generating commit message ---');
        outputChannel.appendLine(`Provider: ${Config.getProvider()}`);
        outputChannel.appendLine(`Model: ${Config.getModel()}`);
        outputChannel.appendLine(`Files changed: ${fileNames.length}`);
        
        const commitMessage = await aiService.generateCommitMessage(
          changeInfo.diff,
          fileNames,
          changeInfo.branchName,
          useConventionalCommits
        );

        progress.report({ increment: 100, message: 'Done!' });

        // Ask if user wants to stage all files
        const stageConfirm = await vscode.window.showQuickPick(
          ['Y - Yes, stage all files', 'N - No, skip staging'],
          {
            placeHolder: 'Stage all files first? (git add .)'
          }
        );

        if (stageConfirm && stageConfirm.includes('Y')) {
          await git.stageAll();
        }

        // Simply show the message and ask to commit
        const finalConfirm = await vscode.window.showInformationMessage(
          `AI Generated Commit:\n\n${commitMessage}\n\nCommit with this message?`,
          'Yes', 'No'
        );

        if (finalConfirm === 'Yes') {
          await git.commit(commitMessage);
          vscode.window.showInformationMessage(`✅ Commit created: ${commitMessage}`);
        }
      }
    );
  } catch (error: any) {
    const errorMessage = error.message || String(error);
    outputChannel.appendLine(`Error: ${errorMessage}`);
    vscode.window.showErrorMessage(`Failed to generate commit: ${errorMessage}`);
  }
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}

