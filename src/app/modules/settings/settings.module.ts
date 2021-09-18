import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesFormComponent } from "./components/preferences-form/preferences-form.component";
import { SharedModule } from "../../shared/shared.module";
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [PreferencesFormComponent, SettingsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [PreferencesFormComponent, SettingsComponent]
})
export class SettingsModule {
}
