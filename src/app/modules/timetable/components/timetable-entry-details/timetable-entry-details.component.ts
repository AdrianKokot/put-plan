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

  public itemDetails: { key: 'lecturer' | 'place' | 'info' | 'groups' | 'additional_info', label: string }[] = [
    {key: 'lecturer', label: 'Prowadzący'},
    {key: 'place', label: 'Sala'},
    {key: 'info', label: 'Typ zajęć'},
    {key: 'groups', label: 'Grupy mające te zajęcia w tym czasie'},
    {key: 'additional_info', label: 'Dodatkowe informacje'}
  ]

  constructor(
    private modalService: ModalService
  ) {
  }

}