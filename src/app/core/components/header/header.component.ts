import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { ModalService } from "../../../shared/modules/modal/services/modal.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('selectGroupTemplate') templateRef!: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    public lessonService: LessonService
  ) {
  }

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
    this.modalService.open(this.templateRef);
  }
}
