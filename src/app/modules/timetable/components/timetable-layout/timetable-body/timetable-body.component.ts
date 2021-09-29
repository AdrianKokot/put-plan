import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Timetable } from '../../../timetable';
import { fromEvent } from 'rxjs';
import { elementAt, filter, switchMap, tap } from 'rxjs/operators';
import { TimetableEntry } from 'src/app/shared/models/timetable-entry';
import { ModalService } from 'src/app/shared/modules/modal/services/modal.service';
import { trackByIndex } from 'src/app/shared/functions/track-by';
import { TimetableService } from 'src/app/shared/services/timetable/timetable.service';

@Component({
  selector: 'app-timetable-body',
  templateUrl: './timetable-body.component.html',
  styles: [`
    #timetableColumnsContainer {
      transform: translateX(calc(var(--selected-weekday-index, 0) / 5 * -100%));
      transition: transform calc(var(--weekday-transition-multiplier, 0) * 0.35s) ease-in-out;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableBodyComponent {
  private currentWeekDayIndex = Timetable.currentWeekDayIndex;

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.currentWeekDayIndex !== this.selectedWeekDayIndex) {
      this.selectedWeekDayIndexChange.emit(this.currentWeekDayIndex);
    }
  }

  private _selectedWeekDayIndex!: number;

  @Input()
  public set selectedWeekDayIndex(index: number) {
    this.document.body.style.setProperty('--weekday-transition-multiplier', Math.log2(Math.abs(this.selectedWeekDayIndex - index) + 1).toString());

    this._selectedWeekDayIndex = index;

    this.document.body.style.setProperty('--selected-weekday-index', this.selectedWeekDayIndex.toString());
  }

  public get selectedWeekDayIndex(): number {
    return this._selectedWeekDayIndex;
  }

  @Output() public selectedWeekDayIndexChange = new EventEmitter<number>();

  public selectedItem: TimetableEntry | null = null;
  public hours = Timetable.ClassesHours;

  @ViewChild('detailsTemplate') detailsModalTemplate!: TemplateRef<any>;

  trackByIndex = trackByIndex;

  constructor(
    public timetable: TimetableService,
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document,
    elementRef: ElementRef) {

    const hammerPan = new Hammer(elementRef.nativeElement, {recognizers: [[Hammer.Pan, {direction: Hammer.DIRECTION_ALL}]]});

    // @ts-ignore
    const pan = fromEvent<HammerInput>(hammerPan, 'panleft panright');

    // @ts-ignore
    fromEvent<HammerInput>(hammerPan, 'panstart')
      .pipe(
        switchMap(() => pan
          .pipe(
            filter((e: any) => Math.abs(e.deltaX) / window.innerWidth > .1),
            elementAt(1),
            tap((e: HammerInput) => {

              if (e.direction === Hammer.DIRECTION_LEFT) {
                this.nextDay();
              } else {
                this.previousDay();
              }

            })
          ))
      )
      .subscribe();
  }

  private nextDay(): void {
    if (this.selectedWeekDayIndex + 1 < Timetable.WeekDays.length) {
      this.selectedWeekDayIndexChange.emit(this.selectedWeekDayIndex + 1);
    }
  }

  private previousDay(): void {
    if (this.selectedWeekDayIndex > 0) {
      this.selectedWeekDayIndexChange.emit(this.selectedWeekDayIndex - 1);
    }
  }

  showDetails(entry: TimetableEntry): void {
    this.selectedItem = entry;
    if (this.detailsModalTemplate) {
      this.modalService.open(this.detailsModalTemplate);
    }
  }
}
