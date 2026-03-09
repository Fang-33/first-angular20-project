import { Component, input } from '@angular/core';
import { HeaderDefaultComponentProps } from './header-default.model';

@Component({
  selector: 'app-header-default',
  imports: [],
  templateUrl: './header-default.html',
  styleUrl: './header-default.scss',
})
export class HeaderDefault {
  // ===== inject =====

  // ===== method decorator =====

  // ===== viewChild =====

  // ===== signal input =====
  headerPropsInput = input.required<HeaderDefaultComponentProps>();

  // ===== signal output =====

  // ===== prop & const =====

  // ===== signal ======

  // ===== signal computed =====

  // ===== signal effect =====

  // ===== lifecycle hooks =====

  // ===== initialization =====

  // ===== catch event =====

  // ===== catch event functions =====

  // ===== getters =====
}
