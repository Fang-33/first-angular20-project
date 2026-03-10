import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { isPanelOpenSignal, togglePanel } from '../../../core/store/sidenav.store';
import { Header } from '../header/header/header';
import { HeaderContentRef } from '../header/header/header.model';

@Component({
  selector: 'app-chat-layout',
  imports: [MatIconModule, RouterOutlet, MatSidenavModule, MatListModule, Header],
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
  responsiveObserver = toSignal(this.observer.observe(['(max-width: 768px)']));
  currentComponent = signal<HeaderContentRef | null>(null);
  isSidenavOpened = isPanelOpenSignal;

  // ===== signal computed =====
  isMobile = computed(() => this.responsiveObserver()?.matches ?? false);
  sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side')); // 螢幕小於 800px 時，sidenav 切換成 over 模式並自動關閉

  // ===== signal effect =====

  // ===== lifecycle hooks =====

  // ===== initialization =====

  // ===== catch event =====
  onActivate(component: HeaderContentRef | null) {
    this.currentComponent.set(component);
  }

  toggleSidebar() {
    togglePanel();
  }

  // ===== catch event functions =====

  // ===== getters =====
}
