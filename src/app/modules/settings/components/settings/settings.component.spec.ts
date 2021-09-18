import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { Component } from "@angular/core";
import { LessonService } from "../../../../shared/services/lesson/lesson.service";
import { Preferences } from "../../../../shared/models/preferences";

@Component({selector: 'app-icon', template: ''})
class IconStubComponent {
}

@Component({selector: 'app-preferences-form', template: ''})
class PreferencesFormStubComponent {
}


describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let lessonStubService: Partial<LessonService> = {
    isWeekEven: true,
    preferences: {} as Preferences
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent, IconStubComponent, PreferencesFormStubComponent],
      imports: [],
      providers: [{provide: LessonService, useValue: lessonStubService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
