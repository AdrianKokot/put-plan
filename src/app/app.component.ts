import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from './components/modal/modal.service';

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
    "Algorytmy i struktury danych",
    "Prawo dla informatyków",
    "Metody probabilistyczne"
  ];
  isEvenWeek: boolean;
  weekTypeCorrect = false;
  selectedGroup: string = localStorage.getItem('selectedGroup') || '';
  obligatory: string[] = localStorage.getItem('obligatory')?.split(':') || [];

  @ViewChild('selectGroupTemplate') templateRef!: TemplateRef<any>;
  constructor(private modalService: ModalService) {
    const now = new Date();
    const date = new Date(now.getFullYear(), 0, 1);
    this.isEvenWeek = (Math.ceil(((new Date(now.getFullYear(), now.getMonth(), now.getDate() - date.getDate()).getTime() / 86400000) + date.getDay() + 1) / 7) % 2 == 0) === this.weekTypeCorrect;
  }

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
