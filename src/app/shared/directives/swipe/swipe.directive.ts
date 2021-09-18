import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Swipe, SwipeCoordinates, SwipeAxis, SwipeEvent, SwipeVector } from "./swipe";
import { elementAt, filter, map, switchMap, take, takeUntil, takeWhile, tap } from "rxjs/operators";
import { fromEvent, Observable } from "rxjs";

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective implements OnInit, OnDestroy {

  @Output() swipeRight: EventEmitter<SwipeEvent> = new EventEmitter<SwipeEvent>();
  @Output() swipeLeft: EventEmitter<SwipeEvent> = new EventEmitter<SwipeEvent>();
  @Output() swipeDown: EventEmitter<SwipeEvent> = new EventEmitter<SwipeEvent>();
  @Output() swipeUp: EventEmitter<SwipeEvent> = new EventEmitter<SwipeEvent>();

  @Output() swipeMove: EventEmitter<SwipeEvent> = new EventEmitter<SwipeEvent>();
  @Output() swipeEnd: EventEmitter<SwipeEvent> = new EventEmitter<SwipeEvent>();


  private isSwipeable = true;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone
  ) {
  }

  private fromTouchEvent(eventName: string): Observable<SwipeCoordinates> {
    return fromEvent<TouchEvent>(this.elementRef.nativeElement, eventName)
      .pipe(map(Swipe.getCoordinatesFromTouchEvent));
  }

  ngOnInit() {

    const touchStarts = this.fromTouchEvent('touchstart');
    const touchMoves = this.fromTouchEvent('touchmove');
    const touchEnds = this.fromTouchEvent('touchend');

    const moveStart = touchStarts.pipe(
      switchMap((start: SwipeCoordinates) => touchMoves
        .pipe(
          elementAt(3),
          map((end: SwipeCoordinates) => {
            return Swipe.getSwipeVector(start, end);
          })
        )
      )
    );

    const untilMoveEnds = (startVector: SwipeVector, axis: SwipeAxis) => touchMoves.pipe(
      map(moveEndCoordinates => Swipe.getSwipeVector(startVector.start, moveEndCoordinates)),
      takeUntil(
        touchEnds.pipe(
          take(1),
          map(moveEndCoordinates => Swipe.getSwipeVector(startVector.start, moveEndCoordinates)),
          tap((endVector: SwipeVector) => this.emitSwipeEndEvent(endVector, axis))
        )
      ),
    );

    const moveWithDirection = (axis: SwipeAxis) => moveStart
      .pipe(
        filter(
          (v: SwipeVector) => axis === 'y'
            ? Math.abs(v.x) < Math.abs(v.y)
            : Math.abs(v.x) >= Math.abs(v.y)
        ),
        switchMap((vector: SwipeVector) => untilMoveEnds(vector, axis))
      )
      .pipe(
        takeWhile(() => this.isSwipeable)
      );


    this.zone.runOutsideAngular(() => {
      moveWithDirection('y')
        .subscribe(v => this.emitSwipeMoveEvent(v, 'y'));

      moveWithDirection('x')
        .subscribe(v => this.emitSwipeMoveEvent(v, 'x'));
    });
  }

  ngOnDestroy() {
    this.isSwipeable = false;
  }


  private emitSwipeMoveEvent(vector: SwipeVector, axis: SwipeAxis) {
    this.swipeMove.emit(new SwipeEvent(vector, axis));
  }

  private emitSwipeEndEvent(vector: SwipeVector, axis: SwipeAxis) {
    const swipeEvent = new SwipeEvent(vector, axis, true);

    const emitter = swipeEvent.axis === 'y'
      ? (swipeEvent.direction === 'down' ? this.swipeDown : this.swipeUp)
      : (swipeEvent.direction === 'left' ? this.swipeLeft : this.swipeRight);

    emitter.emit(swipeEvent);
    this.swipeEnd.emit(swipeEvent);
  }
}
