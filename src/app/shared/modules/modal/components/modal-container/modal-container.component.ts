import { Component, ElementRef, HostListener } from '@angular/core';
import { ModalService } from "../../services/modal.service";
import { debounceTime, filter, startWith, tap, throttleTime } from "rxjs/operators";
import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";
import { fromEvent } from "rxjs";

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
        window.document.body.classList.toggle('overflow-y-hidden', modals.length > 0);
      })
    )

  private HTMLElementRef!: HTMLElement;

  constructor(
    private modalService: ModalService,
    elementRef: ElementRef
  ) {
    this.HTMLElementRef = elementRef.nativeElement;

    fromEvent(window, 'resize')
      .pipe(
        filter(() => window.innerWidth < 768),
        throttleTime(50),
        debounceTime(10),
        startWith({})
      )
      .subscribe(() => {
        this.HTMLElementRef.style.setProperty('--vh', window.innerHeight + 'px');
      });
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
