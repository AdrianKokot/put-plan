import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from 'src/assets/icons';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full fill-current"
      viewBox="0 0 24 24"
      stroke-width="2"
      [innerHTML]="iconSvg"
    ></svg>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private selectedIcon = '';
  private defaultHostClass = 'inline-block focus:outline-none flex-shrink-0';
  private defaultSizeClass = 'w-6 h-6';

  @HostBinding('class') private hostClass =
    this.defaultSizeClass + ' ' + this.defaultHostClass;

  @Input()
  public set class(v: string) {
    this.hostClass = v + ' ' + this.defaultHostClass;
  }

  @Input()
  public set icon(icon: string) {
    this.selectedIcon = icon in icons ? icon : 'default';
  }

  public get icon(): string {
    return this.selectedIcon;
  }

  public get iconSvg(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icons[this.selectedIcon]);
  }

  constructor(private sanitizer: DomSanitizer) { }
}
