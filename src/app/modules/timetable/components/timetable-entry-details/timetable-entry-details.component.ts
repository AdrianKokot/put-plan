import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Lesson } from "../../../../shared/models/lesson";
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";

@Component({
  selector: 'app-timetable-entry-details',
  templateUrl: './timetable-entry-details.component.html',
  styles: []
})
export class TimetableEntryDetailsComponent {
  @ViewChild("detailsTemplate") detailsTemplate!: TemplateRef<any>;

  private _selectedItem!: Lesson;

  @Input()
  set selectedItem(value: Lesson) {
    this._selectedItem = value;

    if (Object.keys(this._selectedItem).length > 0) {
      this.modalService.open(this.detailsTemplate);
    }
  }

  get selectedItem(): Lesson {
    return this._selectedItem;
  }

  constructor(
    private modalService: ModalService
  ) {
  }

}
