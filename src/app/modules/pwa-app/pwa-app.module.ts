import { NgModule } from '@angular/core';
import { CheckPwaUpdateComponent } from './components/check-pwa-update/check-pwa-update.component';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    CheckPwaUpdateComponent
  ],
  exports: [
    CheckPwaUpdateComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PwaAppModule { }
