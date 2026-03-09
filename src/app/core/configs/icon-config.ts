import { provideAppInitializer, inject } from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// 註冊 SVG icon resolver，使用 svgIcon="name" 時自動從 assets/svg/icon/ 載入
// icon 使用：<mat-icon svgIcon="menu_logo" />
// illustration 使用：<mat-icon svgIcon="img:no_result" />
export const provideCustomIcons: EnvironmentProviders = provideAppInitializer(() => {
  const registry = inject(MatIconRegistry);
  const sanitizer = inject(DomSanitizer);

  registry.addSvgIconResolver((name, namespace) => {
    if (namespace === 'img') {
      return sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/illustration/${name}.svg`);
    }
    return sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/icon/${name}.svg`);
  });
});
