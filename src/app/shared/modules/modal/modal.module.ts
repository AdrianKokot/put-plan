import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ModalTemplateComponent } from './components/modal-template/modal-template.component';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [
    ModalContainerComponent,
    ModalTemplateComponent
  ],
  exports: [
    ModalContainerComponent,
    ModalTemplateComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class ModalModule { }
