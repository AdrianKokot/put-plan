import { LessonService } from 'src/app/services/lesson/lesson.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('selectGroupTemplate') templateRef!: TemplateRef<any>;
  constructor(
    private modalService: ModalService,
    public lessonService: LessonService
  ) { }

  currId: number | null = null;
  ngAfterViewInit(): void {
    if (this.lessonService.preferences.selectedGroup === '') {
      this.openSettingsModal();
    }
  }

  changeWeek($e: { preventDefault: () => void; } | null = null) {
    if ($e != null) {
      $e.preventDefault();
    }
    this.lessonService.isWeekEven = !this.lessonService.isWeekEven;
  }

  openSettingsModal($event: { preventDefault: () => void; } | null = null) {
    if ($event) {
      $event.preventDefault();
    }
    this.currId = this.modalService.open(this.templateRef);
  }
}
