import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from "@angular/core";


@Component({selector: 'app-check-pwa-update', template: ''})
class CheckPwaUpdateStubComponent {
}

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent {
}

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {
}

@Component({selector: 'app-timetable', template: ''})
class TimetableStubComponent {
}

@Component({selector: 'app-modal-container', template: ''})
class ModalContainerStubComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CheckPwaUpdateStubComponent,
        FooterStubComponent,
        HeaderStubComponent,
        TimetableStubComponent,
        ModalContainerStubComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
