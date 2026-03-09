import { Component, inject, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { openPanel, togglePanel } from '../../../core/store/sidenav.store';

@Component({
  selector: 'app-layout',
  imports: [MatIconModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  // ===== inject =====
  router = inject(Router);
  // ===== method decorator =====

  // ===== viewChild =====
  sidenav = viewChild.required(MatSidenav);

  // ===== signal input =====

  // ===== signal output =====

  // ===== prop & const =====

  // ===== signal ======
  currentFeature = signal<'chat' | 'settings' | 'ai-assistant'>('chat');

  // ===== signal computed =====

  // ===== signal effect =====

  // ===== lifecycle hooks =====

  // ===== initialization =====

  // ===== catch event =====
  onClickFeature(feature: 'chat' | 'settings' | 'ai-assistant') {
    if (this.currentFeature() === feature) {
      togglePanel();
      return;
    }

    this.currentFeature.set(feature);
    openPanel();
    this.router.navigate([feature]);
  }

  // ===== catch event functions =====

  // ===== getters =====
}
