import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "./modules/modal/modal.module";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";
import { IconModule } from "./modules/icon/icon.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    IconModule
  ],
  exports: [
    CommonModule,
    ModalModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    IconModule
  ]
})
export class SharedModule {
}
