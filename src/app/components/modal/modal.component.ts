import { Component, Inject, Renderer2 } from '@angular/core';
import { animate, group, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [''],
  animations: [
    trigger('modalAnimation', [
      transition('* => void', [
        animate('.25s ease', style({ opacity: 0 })),
      ]),
      transition('void => *', [
        style({ opacity: '0' }),
        group([
          animate('.25s ease', style({ opacity: 1 }))
        ])
      ])
    ])]
})
export class ModalComponent {

  modals$ = this.modalService.modals$;

  constructor(
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {

    this.modalService.total$.subscribe({
      next: (val) => {
        if (val === 0) {
          this.renderer.removeClass(this.document.body, 'overflow-y-hidden');
        } else if (val === 1) {
          this.renderer.addClass(this.document.body, 'overflow-y-hidden');
        }
      }
    });

  }

  public close(id: number) {
    this.modalService.close(id);
  }

  trackById(index: any, item: { id: any }): any {
    return item ? item.id : undefined;
  }
}
