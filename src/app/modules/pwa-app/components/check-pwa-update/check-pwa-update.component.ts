import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";
import { of, Subscription } from "rxjs";
import { delay} from "rxjs/operators";

@Component({
  selector: 'app-check-pwa-update',
  templateUrl: './check-pwa-update.component.html',
  styles: []
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
    })
  }

  ngAfterViewInit(): void {
    this.updateSubscription = this.updates.available
      .pipe(
        delay(500),
      )
      .subscribe(() => {
        this.modalService.open(this.updateTemplate);
      });
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

}
