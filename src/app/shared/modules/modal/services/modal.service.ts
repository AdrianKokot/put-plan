import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from '../../../models/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modals$ = new BehaviorSubject<Modal[]>([]);

  private currId = 0;
  private currLvl = 0;
  private pushStateCount = 0;

  constructor() {
    window.addEventListener('popstate', () => {
      this.pushStateCount--;
    });
  }

  public open(template: TemplateRef<any>, options: { full: boolean } = {full: false}): number {
    const id = this.currId++;
    const lvl = this.currLvl++;

    window.history.pushState({}, '');
    this.pushStateCount++;

    this.modals$.next(
      this.modals$.value.concat({
        id, template, lvl, ...options
      })
    );

    return id;
  }

  public close(id: number): void {
    this.modals$.next(this.modals$.value.filter(x => x.id !== id));
    this.currLvl--;

    if (this.pushStateCount > 0) {
      window.history.back();
    }
  }

  public closeAll(): void {
    for (const id of this.modals$.value.map(x => x.id).reverse()) {
      this.close(id);
    }
  }

  public closeNewest(): void {
    this.close(this.modals$.value[this.modals$.value.length - 1].id);
  }
}
