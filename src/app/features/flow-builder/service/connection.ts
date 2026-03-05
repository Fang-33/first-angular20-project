import { ConnectionPoint, ConnectedLine } from './../flow-builder.model';
import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class Connection {
  // 管理兩種狀態
  connectingFrom = signal<ConnectionPoint | null>(null); //拖拉中的起點，null 代表目前沒有在連線
  connections = signal<ConnectedLine[]>([]); // 所有已完成的連線清單
  isConnecting = signal<boolean>(false);

  /** 使用者按下 port，記錄起點 */
  startConnection(point: ConnectionPoint) {
    this.connectingFrom.set(point);
    this.isConnecting.set(false);
  }

  /** 使用者放開到另一個 port，建立連線 */
  finishConnection(point: ConnectionPoint) {
    const from = this.connectingFrom();
    const to = point;
    if (!from) return; // 沒有起點
    if (from.nodeId === to.nodeId) return; // 起點跟終點不能一樣
    if (this.connections().some((connection) => connection.from === from && connection.to === to))
      return; // 不能重複連線

    const newConnection: ConnectedLine = {
      id: uuidv4(),
      from,
      to,
    };
    this.connections.update((connections) => [...connections, newConnection]);
    this.connectingFrom.set(null);
  }

  /** 使用者放開到空白處，取消連線 */
  cancelConnection() {
    this.connectingFrom.set(null);
  }
}
