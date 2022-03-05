import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { tap } from 'rxjs/operators';
import { trackById } from '../../../../functions/track-by';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  animations: [
    trigger('containerAnimation', [
      state('void', style({opacity: 0})),

      transition('* => void', [
        group([
          query('@modalAnimation', animateChild()),
          animate('.3s ease'),
        ])
      ]),
      transition('void => *', [
        group([
          query('@modalAnimation', animateChild()),
          animate('.3s ease', style({opacity: 1}))
        ])
      ])
    ]),

    trigger('modalAnimation', [
      state('extended', style({height: '100%'})),
      state('void', style({opacity: 0, transform: 'translateY(80%)'})),

      transition('extended <=> *', [
        animate('.5s ease-in-out')
      ]),
      transition('* => void', [
        animate('.4s ease'),
      ]),
      transition('void => *', [
        group([
          animate('.4s ease', style({opacity: 1, transform: 'translateY(0)'}))
        ])
      ])
    ])
  ]
})
export class ModalContainerComponent {
  @HostListener('window:popstate')
  @HostListener('document:keydown.escape')
  onBackButton(): void {
    if (this.modalService.modals$.value.length > 0) {
      this.isModalContainerExtended = false;
      this.closeNewest();
    }
  }

  public modals$ = this.modalService
    .modals$
    .pipe(
      tap((modals) => {

        this.isModalContainerExtended = false;
        window.document.body.classList.toggle('overflow-y-hidden', modals.length > 0);
      })
    )

  constructor(private modalService: ModalService) {
  }

  public close(id: number): void {
    if (!this.isModalContainerExtended) {
      this.modalService.close(id);
    }
  }

  public forceClose(id: number): void {
    this.isModalContainerExtended = false;
    this.modalService.close(id);
  }

  public closeNewest(): void {
    if (!this.isModalContainerExtended) {
      this.modalService.closeNewest();
    }
  }

  public trackById = trackById;
  public isModalContainerExtended = false;
}
