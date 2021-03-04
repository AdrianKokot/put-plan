import { TemplateRef } from "@angular/core";

export interface Modal {
  template: TemplateRef<any>;
  id: number;
  lvl: number;
}
