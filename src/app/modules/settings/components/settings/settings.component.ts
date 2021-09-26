import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { LessonService } from "../../../../shared/services/lesson/lesson.service";
import { FormBuilder } from "@angular/forms";
import { appThemes } from "../../../../shared/types/app-theme";
import { AppSettingsService } from "../../../../shared/services/app-settings/app-settings.service";

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
    theme: [this.settingsService.settings.theme],
    weekendBehavior: []
  })

  private formChangeSubscription = this.form.valueChanges.subscribe(formValue => {
    this.settingsService.settings = {
      theme: formValue.theme
    };

    this.lessonService.preferences = {
      selectedGroup: formValue.group,
      selectedOptionalClasses: formValue.optionalClasses,
      selectedLanguageClass: formValue.languageClass
    };
  })

  constructor(
    private modalService: ModalService,
    public lessonService: LessonService,
    private fb: FormBuilder,
    private settingsService: AppSettingsService
  ) {
  }

  ngOnDestroy(): void {
    this.formChangeSubscription.unsubscribe();
  }

  public appThemes = appThemes;
  public groups$ = this.lessonService.getGroups();
  public optionalClasses$ = this.lessonService.getOptionalClasses();
  public languageClasses$ = this.lessonService.getLanguagesClasses();


  ngAfterViewInit(): void {
    if (this.lessonService.preferences.selectedGroup === '') {
      this.openSettingsModal();
    }
  }

  openSettingsModal() {
    this.modalService.open(this.formTemplate, {full: true});
  }

  submit() {
    this.settingsService.save();
    this.lessonService.savePreferencesInStorage();
    this.modalService.closeNewest();
  }
}
