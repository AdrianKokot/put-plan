import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "./modules/modal/modal.module";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    ModalModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ]
})
export class SharedModule {
}
