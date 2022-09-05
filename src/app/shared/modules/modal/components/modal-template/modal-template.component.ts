import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html'
})
export class ModalTemplateComponent {
  @Input() public modal!: { close: () => void };
  @Input() public title = '';
  @Input() public hasFooter = false;
}
