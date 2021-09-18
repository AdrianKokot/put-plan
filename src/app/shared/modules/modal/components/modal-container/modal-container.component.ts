import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { ModalService } from "../../services/modal.service";
import { tap } from "rxjs/operators";
import { animate, group, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styles: [],
  animations: [
    trigger('modalAnimation', [
      transition('* => void', [
        animate('.25s ease', style({opacity: 0})),
      ]),
      transition('void => *', [
        style({opacity: '0'}),
        group([
          animate('.25s ease', style({opacity: 1}))
        ])
      ])
    ])
  ]
})
export class ModalContainerComponent {

  public modals$ = this.modalService
    .modals$
    .pipe(
      tap((modals) => {

      })
    )

  constructor(
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  public close(id: number): void {
    this.modalService.close(id);
  }

  public closeNewest(): void {
    this.modalService.closeNewest();
  }

  public trackById(index: any, item: { id: any }): any {
    return item ? item.id : undefined;
  }
}
