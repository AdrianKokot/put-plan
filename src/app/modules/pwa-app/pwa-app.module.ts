import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CheckPwaUpdateComponent } from './components/check-pwa-update/check-pwa-update.component';

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
