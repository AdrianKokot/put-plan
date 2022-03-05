import {
  AfterViewInit,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { ModalService } from '../../../../shared/modules/modal/services/modal.service';

@Component({
  selector: 'app-check-pwa-update',
  templateUrl: './check-pwa-update.component.html',
  styles: [],
})
export class CheckPwaUpdateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appSettingsTemplate') updateTemplate!: TemplateRef<any>;

  private updateSubscription: Subscription | null = null;

  constructor(
    private readonly updates: SwUpdate,
    private modalService: ModalService
  ) {}

  public performUpdate(): void {
    this.updates.activateUpdate().then(() => {
      document.location.reload();
    });
  }

  ngAfterViewInit(): void {
    this.updateSubscription = this.updates.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        delay(500)
      )
      .subscribe(() => {
        this.modalService.open(this.updateTemplate);
      });
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }
}
