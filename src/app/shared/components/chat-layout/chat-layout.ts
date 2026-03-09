import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header/header';
import { HeaderContentRef } from '../header/header/header.model';
import { isPanelOpenSignal } from '../../../core/store/sidenav.store';
import { HeaderDefault } from '../header/header-default/header-default';

@Component({
  selector: 'app-chat-layout',
  imports: [MatIconModule, RouterOutlet, MatSidenavModule, MatListModule, Header, HeaderDefault],
  templateUrl: './chat-layout.html',
  styleUrl: './chat-layout.scss',
})
export class ChatLayout {
  // ===== inject =====
  observer = inject(BreakpointObserver);

  // ===== method decorator =====

  // ===== viewChild =====

  // ===== signal input =====

  // ===== signal output =====

  // ===== prop & const =====

  // ===== signal ======
  responsiveObserver = toSignal(this.observer.observe(['(max-width: 800px)']));
  isSidebarCollapsed = signal(false); // sidebar 收合（只剩 icon）
  isSubNodeCollapsed = signal(true); // sub-sections 展開收合
  currentComponent = signal<HeaderContentRef | null>(null);

  // ===== signal computed =====
  isMobile = computed(() => this.responsiveObserver()?.matches ?? false);
  isSidenavOpened = computed(() => !this.isMobile());
  sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side')); // 螢幕小於 800px 時，sidenav 切換成 over 模式並自動關閉
  isPanelOpen = isPanelOpenSignal;
  // ===== signal effect =====

  // ===== lifecycle hooks =====

  // ===== initialization =====

  // ===== catch event =====

  onActivate(component: HeaderContentRef | null) {
    this.currentComponent.set(component);
  }

  // ===== catch event functions =====

  // ===== getters =====
}
