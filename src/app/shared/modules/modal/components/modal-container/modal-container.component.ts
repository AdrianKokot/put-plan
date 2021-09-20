import { Component } from '@angular/core';
import { ModalService } from "../../services/modal.service";
import { tap } from "rxjs/operators";
import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styles: [],
  animations: [
    trigger('containerAnimation', [
      transition('* => void', [
        group([
          query("@modalAnimation", animateChild()),
          animate('.3s ease', style({opacity: 0})),
        ])
      ]),
      transition('void => *', [
        style({opacity: '0'}),
        group([
          query("@modalAnimation", animateChild()),
          animate('.3s ease', style({opacity: 1}))
        ])
      ])
    ]),
    trigger('modalAnimation', [
      transition('* => void', [
        animate('.3s ease', style({opacity: 0, transform: 'translateY(80%)'})),
      ]),
      transition('void => *', [
        style({opacity: 0, transform: 'translateY(80%)'}),
        group([
          animate('.3s ease', style({opacity: 1, transform: 'translateY(0)'}))
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
        window.document.body.classList.toggle('overflow-y-hidden', modals.length > 0);
      })
    )

  constructor(
    private modalService: ModalService
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
