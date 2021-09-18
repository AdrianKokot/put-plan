import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesFormComponent } from "./components/preferences-form/preferences-form.component";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [PreferencesFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [PreferencesFormComponent]
})
export class SettingsModule {
}
