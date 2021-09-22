import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { LessonService } from "../../../../shared/services/lesson/lesson.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('selectGroupTemplate') templateRef!: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    public lessonService: LessonService
  ) {
  }

  selectedGroup: string = this.lessonService.preferences.selectedGroup;
  selectedOptionalClasses: string[] = this.lessonService.preferences.selectedOptionalClasses;
  selectedLanguageClass: string = this.lessonService.preferences.selectedLanguageClass;

  groups$: Observable<string[]> = this.lessonService.getGroups();
  optionalClasses$: Observable<string[]> = this.lessonService.getOptionalClasses();
  languageClasses$: Observable<string[]> = this.lessonService.getLanguagesClasses();


  savePreferences(): void {
    this.lessonService.savePreferencesInStorage();
    this.modalService.closeNewest();
  }

  onChange(): void {
    this.lessonService.preferences = {
      selectedGroup: this.selectedGroup,
      selectedOptionalClasses: this.selectedOptionalClasses,
      selectedLanguageClass: this.selectedLanguageClass
    };
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
