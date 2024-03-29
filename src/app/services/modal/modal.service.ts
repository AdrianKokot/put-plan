import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from 'src/app/models/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modals$ = new BehaviorSubject<Modal[]>([]);
  public total$ = new BehaviorSubject<number>(0);
  private nextId = 0;
  private currLvl = 0;

  open(template: TemplateRef<any>): number {
    const id = this.nextId++;
    const lvl = this.currLvl++;

    this.modals$.value.push({
      id, template, lvl
    });
    this.total$.next(this.modals$.value.length);

    return id;
  }

  close(id: number): void {
    this.modals$.next(this.modals$.value.filter(x => x.id != id));
    this.total$.next(this.modals$.value.length);
    this.currLvl--;
  }
}
