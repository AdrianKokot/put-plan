import { AppTheme } from "../types/app-theme";

export class StorageManager {
  public static get(key: string, defaultValue: any = null): any {
    return localStorage.getItem(key) || defaultValue;
  }

  public static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public static getSavedTheme(): AppTheme {
    return StorageManager.get('app.theme', 'default') as AppTheme;
  }
}

