import { LabeledProperty } from './labeled-property';

export type AppTheme = 'dark' | 'light' | 'system';

export const appThemes: LabeledProperty<AppTheme>[] = [
  {key: 'dark', label: 'Ciemny'},
  {key: 'light', label: 'Jasny'},
  {key: 'system', label: 'Taki sam jak motyw systemu'},
];

export class AppThemeManager {
  public static setTheme(theme: AppTheme): void {
    if (theme === 'system') {
      theme = AppThemeManager.getSystemTheme();
    }

    window.document.querySelector('html')?.classList.toggle('dark', theme === 'dark');
  }

  public static getSystemTheme(): AppTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
