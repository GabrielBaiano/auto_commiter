import simpleGit, { SimpleGit, DiffResult } from 'simple-git';
import * as vscode from 'vscode';
import * as path from 'path';

export interface GitChangeInfo {
  diff: string;
  fileNames: string[];
  stagedFiles: string[];
  unstagedFiles: string[];
  branchName: string;
}

export class GitUtils {
  private git: SimpleGit;

  constructor(workspaceRoot?: string) {
    this.git = simpleGit(workspaceRoot || vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '.');
  }

  /**
   * Get the diff of all changes (staged and unstaged)
   */
  async getDiff(): Promise<string> {
    try {
      // Get both staged and unstaged changes
      const stagedDiff = await this.git.diff(['--cached']);
      const unstagedDiff = await this.git.diff();
      return stagedDiff + '\n' + unstagedDiff;
    } catch (error) {
      console.error('Error getting diff:', error);
      return '';
    }
  }

  /**
   * Get staged files
   */
  async getStagedFiles(): Promise<string[]> {
    try {
      const status = await this.git.status();
      return status.staged;
    } catch (error) {
      console.error('Error getting staged files:', error);
      return [];
    }
  }

  /**
   * Get unstaged files
   */
  async getUnstagedFiles(): Promise<string[]> {
    try {
      const status = await this.git.status();
      return status.not_added;
    } catch (error) {
      console.error('Error getting unstaged files:', error);
      return [];
    }
  }

  /**
   * Get current branch name
   */
  async getBranchName(): Promise<string> {
    try {
      const branches = await this.git.branchLocal();
      return branches.current;
    } catch (error) {
      console.error('Error getting branch name:', error);
      return 'unknown';
    }
  }

  /**
   * Get all modified file names
   */
  async getModifiedFileNames(): Promise<string[]> {
    try {
      const status = await this.git.status();
      const allFiles = [
        ...status.staged,
        ...status.not_added,
        ...status.created,
        ...status.modified,
        ...status.deleted
      ];
      return [...new Set(allFiles)]; // Remove duplicates
    } catch (error) {
      console.error('Error getting modified files:', error);
      return [];
    }
  }

  /**
   * Get comprehensive git change information
   */
  async getChangeInfo(): Promise<GitChangeInfo> {
    const [diff, fileNames, stagedFiles, unstagedFiles, branchName] = await Promise.all([
      this.getDiff(),
      this.getModifiedFileNames(),
      this.getStagedFiles(),
      this.getUnstagedFiles(),
      this.getBranchName()
    ]);

    return {
      diff,
      fileNames,
      stagedFiles,
      unstagedFiles,
      branchName
    };
  }

  /**
   * Check if there are any changes to commit
   */
  async hasChanges(): Promise<boolean> {
    try {
      const status = await this.git.status();
      const hasChanges = status.files.length > 0 || status.staged.length > 0;
      return hasChanges;
    } catch (error) {
      console.error('Error checking for changes:', error);
      return false;
    }
  }

  /**
   * Stage all files
   */
  async stageAll(): Promise<void> {
    try {
      await this.git.add('.');
    } catch (error) {
      console.error('Error staging files:', error);
      throw error;
    }
  }

  /**
   * Commit with the given message
   */
  async commit(message: string): Promise<void> {
    try {
      await this.git.commit(message);
    } catch (error) {
      console.error('Error committing:', error);
      throw error;
    }
  }

  /**
   * Check if we're in a git repository
   */
  async isGitRepo(): Promise<boolean> {
    try {
      const result = await this.git.checkIsRepo();
      return result;
    } catch (error) {
      return false;
    }
  }
}

