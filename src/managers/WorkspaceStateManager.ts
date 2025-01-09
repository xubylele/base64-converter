import * as vscode from 'vscode';
import { HistoryEntry } from '../types/history';

const MAX_ENTRIES = 40;

export class WorkspaceStateManager<T extends any[]> {
  private context: vscode.ExtensionContext;
  private key: string;

  constructor(context: vscode.ExtensionContext, key: string) {
    this.context = context;
    this.key = key;
  }

  /**
   * Retrieve the data from workspaceState.
   * @param defaultValue Default value to return if no data is found.
   * @returns The stored data or the default value.
   */
  public get(defaultValue: T): T {
    return this.context.workspaceState.get<T>(this.key, defaultValue);
  }

  /**
   * Add a value to the history.
   * @param value The value to add.
   */
  public add(value: HistoryEntry): void {
    const history = this.getAll();
    console.info('history', history);
    history.unshift(value);

    if (history.length > MAX_ENTRIES) {
      history.pop();
    }

    this.set(history);
  }

  /**
   * Save data to workspaceState.
   * @param value The data to store.
   */
  public set(value: T): void {
    this.context.workspaceState.update(this.key, value);
  }

  /**
   * Retrieve all the data stored under the specified key.
   * @returns The stored data.
   */
  public getAll(): T {
    return this.get([] as unknown as T);
  }

  /**
   * Clear the data stored under the specified key.
   */
  public clear(): void {
    this.context.workspaceState.update(this.key, undefined);
  }
}
