import { ModalService } from 'src/app/services/modal/modal.service';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';

function getWeekNumber(d: any = new Date()) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  groups = [
    'i3.1',
    'i3.2'
  ];
  obligs = [
    'Algorytmy i struktury danych',
    'Prawo dla informatyków',
    'Metody probabilistyczne',
    'Elementy analizy numerycznej',
    'Algorytmika Praktyczna',
    'Metodologia nauk dla inżynierów'
  ];
  weekTypeCorrect = false;
  isEvenWeek: boolean = (getWeekNumber() % 2 == 0 ) === this.weekTypeCorrect;
  selectedGroup: string = localStorage.getItem('selectedGroup') || '';
  obligatory: string[] = localStorage.getItem('obligatory')?.split(':') || [];

  @ViewChild('selectGroupTemplate') templateRef!: TemplateRef<any>;
  constructor(private modalService: ModalService) { }

  currId: number | null = null;
  ngAfterViewInit(): void {
    if (this.selectedGroup === '') {
      this.openSettingsModal();
    }
  }

  savePreferences() {
    if (this.currId != null) {
      localStorage.setItem('selectedGroup', this.selectedGroup);
      localStorage.setItem('obligatory', this.obligatory.join(':'));
      this.modalService.close(this.currId);
    }
  }

  changeWeek($e: { preventDefault: () => void; } | null = null) {
    if ($e != null) {
      $e.preventDefault();
    }
    this.isEvenWeek = !this.isEvenWeek;
  }

  openSettingsModal($event: { preventDefault: () => void; } | null = null) {
    if ($event) {
      $event.preventDefault();
    }
    this.currId = this.modalService.open(this.templateRef);
  }
}
