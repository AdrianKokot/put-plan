import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { AppThemeManager } from '../../types/app-theme';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private _settings: AppSettings = this.getSettingsFromStorage();

  public get settings(): AppSettings {
    return this._settings;
  }

  public set settings(value: Partial<AppSettings>) {
    Object.assign(this._settings, value);

    AppThemeManager.setTheme(this._settings.theme);
  }

  constructor() {
    AppThemeManager.setTheme(this._settings.theme);
  }

  public save(): void {
    this.saveSettingsInStorage();
  }

  private getSettingsFromStorage(): AppSettings {
    return JSON.parse(localStorage.getItem(`app`) || `{"theme": "system"}`) as AppSettings;
  }

  private saveSettingsInStorage(): void {
    localStorage.setItem('app', JSON.stringify(this.settings));
  }

}
