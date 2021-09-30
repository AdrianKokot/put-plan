import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Timetable } from '../../../timetable';

@Component({
  selector: 'app-timetable-header',
  templateUrl: './timetable-header.component.html',
  styles: []
})
export class TimetableHeaderComponent implements AfterViewInit {
  private _selectedWeekDayIndex!: number;

  public get selectedWeekDayIndex(): number {
    return this._selectedWeekDayIndex;
  }

  @Input()
  public set selectedWeekDayIndex(value: number) {
    this._selectedWeekDayIndex = value;
    this.updateContainerPosition();
  }

  @Output() public readonly selectedWeekDayIndexChange = new EventEmitter<number>();

  public weekDays = Timetable.WeekDays;

  private buttons: NodeListOf<HTMLButtonElement> | null = null;
  private componentElement: HTMLElement;

  constructor(element: ElementRef) {
    this.componentElement = element.nativeElement;
  }

  ngAfterViewInit(): void {
    this.buttons = this.componentElement.querySelectorAll('button');
    this.updateContainerPosition();
  }

  public selectWeekDayIndex(index: number): void {
    if (window.innerWidth < 768) {
      this.selectedWeekDayIndexChange.emit(index);
    }
  }

  private updateContainerPosition(): void {
    if (this.buttons) {
      this.buttons.item(this.selectedWeekDayIndex).scrollIntoView({block: 'nearest', behavior: 'smooth'});
    }
  }
}
