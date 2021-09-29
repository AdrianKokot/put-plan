import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/modules/modal/services/modal.service';
import { FormBuilder } from '@angular/forms';
import { TimetableService } from 'src/app/shared/services/timetable/timetable.service';
import { AppSettingsService } from 'src/app/shared/services/app-settings/app-settings.service';
import { appThemes } from 'src/app/shared/types/app-theme';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appSettingsTemplate') formTemplate!: TemplateRef<any>;

  public form = this.fb.group({
    group: [this.timetableService.preferences.selectedGroup],
    optionalClasses: [this.timetableService.preferences.selectedOptionalClasses],
    languageClass: [this.timetableService.preferences.selectedLanguageClass],
    theme: [this.settingsService.settings.theme],
    weekendBehavior: []
  })

  private formChangeSubscription = this.form.valueChanges.subscribe(formValue => {
    this.settingsService.settings = {
      theme: formValue.theme,
    };

    this.timetableService.preferences = {
      selectedGroup: formValue.group,
      selectedOptionalClasses: formValue.optionalClasses,
      selectedLanguageClass: formValue.languageClass
    };
  })

  constructor(
    private modalService: ModalService,
    public timetableService: TimetableService,
    private fb: FormBuilder,
    private settingsService: AppSettingsService
  ) {
  }

  ngOnDestroy(): void {
    this.formChangeSubscription.unsubscribe();
  }

  public appThemes = appThemes;


  ngAfterViewInit(): void {
    if (!this.timetableService.preferences.selectedGroup) {
      this.openSettingsModal();
    }
  }

  openSettingsModal(): void {
    this.modalService.open(this.formTemplate, {full: true});
  }

  submit(): void {
    this.settingsService.save();
    this.timetableService.savePreferences();
    this.modalService.closeNewest();
  }
}
