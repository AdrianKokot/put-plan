import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { LessonService } from "../../../../shared/services/lesson/lesson.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appSettingsTemplate') formTemplate!: TemplateRef<any>;

  public form = this.fb.group({
    group: [this.lessonService.preferences.selectedGroup],
    optionalClasses: [this.lessonService.preferences.selectedOptionalClasses],
    languageClass: [this.lessonService.preferences.selectedLanguageClass],
    theme: [],
    weekendBehavior: []
  })

  private formChangeSubscription = this.form.valueChanges.subscribe(formValue => {
    this.lessonService.preferences = {
      selectedGroup: formValue.group,
      selectedOptionalClasses: formValue.optionalClasses,
      selectedLanguageClass: formValue.languageClass
    };
  })

  constructor(
    private modalService: ModalService,
    public lessonService: LessonService,
    private fb: FormBuilder
  ) {
  }

  ngOnDestroy(): void {
    this.formChangeSubscription.unsubscribe();
  }

  groups$ = this.lessonService.getGroups();
  optionalClasses$ = this.lessonService.getOptionalClasses();
  languageClasses$ = this.lessonService.getLanguagesClasses();


  ngAfterViewInit(): void {
    if (this.lessonService.preferences.selectedGroup === '') {
      this.openSettingsModal();
    }
  }

  openSettingsModal() {
    this.modalService.open(this.formTemplate);
  }

  submit() {
    this.lessonService.savePreferencesInStorage();
    this.modalService.closeNewest();
  }
}
