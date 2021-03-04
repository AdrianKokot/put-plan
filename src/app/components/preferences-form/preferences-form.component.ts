import { Observable } from 'rxjs';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styles: ['']
})
export class PreferencesFormComponent {
  @Input() modal: { close: () => {} } | null = null;
  selectedGroup: string = this.lessonService.preferences.selectedGroup;
  selectedOptionalClasses: string[] = this.lessonService.preferences.selectedOptionalClasses;

  groups$: Observable<string[]> = this.lessonService.getGroups();
  optionalClasses$: Observable<string[]> = this.lessonService.getOptionalClasses();

  constructor(private lessonService: LessonService) { }

  savePreferences() {
    this.lessonService.savePreferencesInStorage();
    this.close();
  }

  onChange() {
    this.lessonService.preferences = {
      selectedGroup: this.selectedGroup,
      selectedOptionalClasses: this.selectedOptionalClasses
    };
  }

  close() {
    if (this.modal != null) {
      this.modal.close();
    }
  }
}
