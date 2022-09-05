import { Component } from '@angular/core';
import { TimetableService } from '../../../shared/services/timetable/timetable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public headerTitle = 'Politechnika Poznańska';

  constructor(public timetable: TimetableService) { }
}
