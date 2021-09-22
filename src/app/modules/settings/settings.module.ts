import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { SettingsComponent } from './components/settings/settings.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule {
}
