import { Component, TemplateRef, viewChild } from '@angular/core';
import { HeaderDefault } from '../../../shared/components/header/header-default/header-default';
import { HeaderContentRef } from '../../../shared/components/header/header/header.model';

@Component({
  selector: 'app-new-chat',
  imports: [HeaderDefault],
  templateUrl: './new-chat.html',
  styleUrl: './new-chat.scss',
})
export class NewChat implements HeaderContentRef {
  // ===== inject =====

  // ===== method decorator =====

  // ===== viewChild =====
  headerContent = viewChild.required(TemplateRef);

  // ===== signal input =====

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
