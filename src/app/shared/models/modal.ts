import { TemplateRef } from '@angular/core';

export interface Modal {
  id: number;
  lvl: number;
  template: TemplateRef<any>;
  full?: boolean;
}
