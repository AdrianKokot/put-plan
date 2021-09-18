import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Modal } from "../../../models/modal";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modals$ = new BehaviorSubject<Modal[]>([]);

  private currId = 0;
  private currLvl = 0;

  public open(template: TemplateRef<any>, htmlClass: string = ''): number {
    const id = this.currId++;
    const lvl = this.currLvl++;

    this.modals$.next(
      [...this.modals$.value, {
        id, template, lvl, class: htmlClass
      }]
    );

    return id;
  }

  public close(id: number): void {
    this.modals$.next(this.modals$.value.filter(x => x.id !== id));
    this.currLvl--;
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
