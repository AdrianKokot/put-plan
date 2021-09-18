import { Observable } from 'rxjs';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styles: []
})
export class PreferencesFormComponent {
  @Input() modal: { close: () => {} } | null = null;
  selectedGroup: string = this.lessonService.preferences.selectedGroup;
  selectedOptionalClasses: string[] = this.lessonService.preferences.selectedOptionalClasses;
  selectedLanguageClass: string = this.lessonService.preferences.selectedLanguageClass;

  groups$: Observable<string[]> = this.lessonService.getGroups();
  optionalClasses$: Observable<string[]> = this.lessonService.getOptionalClasses();
  languageClasses$: Observable<string[]> = this.lessonService.getLanguagesClasses();

  constructor(private lessonService: LessonService) {
  }

  savePreferences(): void {
    this.lessonService.savePreferencesInStorage();
    this.close();
  }

  onChange(): void {
    this.lessonService.preferences = {
      selectedGroup: this.selectedGroup,
      selectedOptionalClasses: this.selectedOptionalClasses,
      selectedLanguageClass: this.selectedLanguageClass
    };
  }

  close(): void {
    if (this.modal != null) {
      this.modal.close();
    }
  }
}
