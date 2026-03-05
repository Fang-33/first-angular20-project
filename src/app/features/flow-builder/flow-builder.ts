import { Component, effect, ElementRef, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { FlowNode } from './components/flow-node/flow-node';
import { Connection } from './service/connection';
import { ConnectedLine, ConnectionPoint } from './flow-builder.model';

@Component({
  selector: 'app-flow-builder',
  imports: [FlowNode],
  templateUrl: './flow-builder.html',
  styleUrl: './flow-builder.scss',
})
export class FlowBuilder implements OnInit, OnDestroy {
  // ===== inject =====
  connectionService = inject(Connection);

  // ===== method decorator =====

  // ===== viewChild =====
  canvasEl = viewChild.required<ElementRef>('canvasEl');
  connectionsSvg = viewChild.required<ElementRef<SVGElement>>('connectionsSvg');
  connectionsGroup = viewChild.required<ElementRef<SVGGElement>>('connectionsGroup');
  tempGroup = viewChild.required<ElementRef<SVGGElement>>('tempGroup');
  // ===== signal input =====

  // ===== signal output =====

  // ===== prop & const =====
  private mouseMoveListener: ((event: MouseEvent) => void) | null = null;
  private mouseUpListener: (() => void) | null = null;

  // ===== signal ======

  // ===== signal computed =====

  // ===== signal effect =====
  reConnect = effect(() => {
    const connections = this.connectionService.connections();
    this.renderConnections(connections);
  });

  // 監聽拖拉中的臨時連線
  tempConnect = effect(() => {
    const connectingFrom = this.connectionService.connectingFrom();
    if (connectingFrom) {
      this.startTempLine(connectingFrom);
    } else {
      this.clearTempLine();
    }
  });

  // ===== lifecycle hooks =====
  ngOnInit() {
    this.mouseUpListener = () => {
      if (!this.connectionService.isConnecting()) {
        this.connectionService.isConnecting.set(true);
        return;
      }
      if (this.connectionService.connectingFrom()) {
        this.connectionService.cancelConnection();
      }
    };
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  ngOnDestroy() {
    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
    }
  }

  // ===== initialization =====

  // ===== catch event =====

  private buildBezierPath(start: { x: number; y: number }, end: { x: number; y: number }): string {
    const dx = Math.abs(end.x - start.x) * 0.5;
    const cp1x = start.x + dx;
    const cp2x = end.x - dx;

    return `M ${start.x},${start.y} C ${cp1x},${start.y} ${cp2x},${end.y} ${end.x},${end.y}`;
  }

  // ===== catch event functions =====
  private startTempLine(from: ConnectionPoint) {
    const canvasRect = this.canvasEl().nativeElement.getBoundingClientRect();

    // 1. 先建立一個 path 元素
    const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tempPath.setAttribute('stroke', '#6c63ff');
    tempPath.setAttribute('stroke-width', '2');
    tempPath.setAttribute('fill', 'none');
    tempPath.setAttribute('stroke-dasharray', '6 4'); // 虛線
    this.tempGroup().nativeElement.appendChild(tempPath);

    // 2. mousemove 時只更新這個 path 的 d 屬性
    this.mouseMoveListener = (event: MouseEvent) => {
      const start = this.getPortCenter(from.element);
      const end = {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      };

      tempPath.setAttribute('d', this.buildBezierPath(start, end));
    };

    document.addEventListener('mousemove', this.mouseMoveListener);
  }

  private renderConnections(connections: ConnectedLine[]) {
    // 用 getPortCenter 拿到起點和終點座標，再用 buildBezierPath 算出路徑
    const group = this.connectionsGroup().nativeElement;
    group.innerHTML = '';
    connections.forEach((connection) => {
      const start = this.getPortCenter(connection.from.element);
      const end = this.getPortCenter(connection.to.element);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('stroke', '#6c63ff');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrowhead)');
      path.setAttribute('d', this.buildBezierPath(start, end));
      group.appendChild(path);
    });
  }

  private clearTempLine() {
    this.tempGroup().nativeElement.innerHTML = '';
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
      this.mouseMoveListener = null;
    }
  }

  private getPortCenter(portElement: HTMLElement): { x: number; y: number } {
    const canvasRect = this.canvasEl().nativeElement.getBoundingClientRect();
    const portRect = portElement.getBoundingClientRect();

    return {
      x: portRect.left + portRect.width / 2 - canvasRect.left,
      y: portRect.top + portRect.height / 2 - canvasRect.top,
    };
  }
  // ===== getters =====
}
