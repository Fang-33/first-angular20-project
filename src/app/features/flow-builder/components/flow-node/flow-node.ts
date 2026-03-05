import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, inject, input, output } from '@angular/core';
import { Connection } from '../../service/connection';

@Component({
  selector: 'app-flow-node',
  imports: [CdkDrag],
  templateUrl: './flow-node.html',
  styleUrl: './flow-node.scss',
})
export class FlowNode {
  // ===== inject =====
  connectionService = inject(Connection);

  // ===== method decorator =====

  // ===== viewChild =====

  // ===== signal input =====
  nodeId = input.required<string>();
  nodeLabel = input.required<string>();

  // ===== signal output =====
  nodeDragged = output();

  // ===== prop & const =====

  // ===== signal ======

  // ===== signal computed =====

  // ===== signal effect =====

  // ===== lifecycle hooks =====

  // ===== initialization =====

  // ===== catch event =====
  /** 使用者按下 port，代表要開始連線 */
  onPortMouseDown(event: MouseEvent, portElement: HTMLElement) {
    event.stopPropagation();

    if (this.connectionService.connectingFrom()) {
      // 已經有起點，這次是終點
      this.connectionService.finishConnection({
        nodeId: this.nodeId(),
        element: portElement,
      });
    } else {
      // 沒有起點，這次是起點
      this.connectionService.startConnection({
        nodeId: this.nodeId(),
        element: portElement,
      });
    }
  }

  // ===== catch event functions =====

  // ===== getters =====
}
