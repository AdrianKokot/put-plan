import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";
import { Component, HostListener } from '@angular/core';
import { tap } from "rxjs/operators";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styles: [],
  animations: [
    trigger('containerAnimation', [
      transition('* => void', [
        group([
          query("@modalAnimation", animateChild()),
          animate('.3s ease', style({ opacity: 0 })),
        ])
      ]),
      transition('void => *', [
        style({ opacity: '0' }),
        group([
          query("@modalAnimation", animateChild()),
          animate('.3s ease', style({ opacity: 1 }))
        ])
      ])
    ]),
    trigger('modalAnimation', [
      state('extended', style({ height: '100%' })),
      transition('extended <=> *', [
        animate('.5s ease-in-out')
      ]),
      transition('* => void', [
        animate('.3s ease', style({ opacity: 0, transform: 'translateY(80%)' })),
      ]),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(80%)' }),
        group([
          animate('.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ])
    ])
  ]
})
export class ModalContainerComponent {
  @HostListener("window:popstate")
  @HostListener('document:keydown.escape')
  onBackButton(): void {
    if (this.modalService.modals$.value.length > 0) {
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

  constructor(private modalService: ModalService) { }

  public close(id: number): void {
    this.isModalContainerExtended || this.modalService.close(id);
  }

  public closeNewest(): void {
    this.isModalContainerExtended || this.modalService.closeNewest();
  }

  public trackById(index: any, item: { id: any }): any {
    return item ? item.id : undefined;
  }

  public isModalContainerExtended = false;

  public pan(e: any): void {
    e.preventDefault();
    // e.stopPropagation();

    if (window.innerWidth >= 768)
      return;

    if (Math.abs(e.deltaY) / window.innerHeight > 0.1) {
      if (e.type === 'panup') {
        this.isModalContainerExtended || (this.isModalContainerExtended = true);
      } else {
        this.isModalContainerExtended && (this.isModalContainerExtended = false);
      }

      console.log('pan!');
    }

  }

  public swipe(e: Event): void {
    e.preventDefault();

    if (e.type === 'swipedown') {
      this.isModalContainerExtended ? (this.isModalContainerExtended = false) : (this.closeNewest());
    } else {
      this.isModalContainerExtended || (this.isModalContainerExtended = true);
    }

    console.log('swipe');
  }

  public reactOnVerticalTouch(e: { type: string, deltaY?: number, preventDefault: () => void }): void {
    if (window.innerWidth >= 768) return;

    e.preventDefault();

    const isUp = e.type.includes('up');

  }
}
