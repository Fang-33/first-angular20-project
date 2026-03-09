import { Signal, TemplateRef } from '@angular/core';

export interface HeaderContentRef {
  headerContent: Signal<TemplateRef<unknown>>;
}
