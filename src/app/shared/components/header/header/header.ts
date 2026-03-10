import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderContentRef } from './header.model';

/**
 * 使用方法，在 ng-template 裡面放需要的 header component
 * <ng-template #headerContent>
 * <app-header-default
 *  [headerPropsInput]="headerPropsInput()"
 *  (headerBtnClickOutput)="catchHeaderbtnClick($event)"
 * />
 *</ng-template>
 */

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, NgTemplateOutlet, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // ===== inject =====

  // ===== method decorator =====

  // ===== viewChild =====

  // ===== signal input =====
  isMobileInput = input.required<boolean>();
  currentComponentInput = input<HeaderContentRef | null>(null);
  defaultTitle = input.required<string>();

  // ===== signal output =====
  toggleSidebarOutput = output();

  // ===== prop & const =====

  // ===== signal ======

  // ===== signal computed =====

  // ===== signal effect =====

  // ===== lifecycle hooks =====

  // ===== initialization =====

  // ===== catch event =====
  toggleSidebar() {
    this.toggleSidebarOutput.emit();
  }

  // ===== catch event functions =====

  // ===== getters =====
}
