import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    ModalContainerComponent,
    ModalComponent
  ],
  exports: [
    ModalContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
