// 連線的起點或終點資訊
export interface ConnectionPoint {
  nodeId: string; // 屬於哪個節點
  element: HTMLElement; // port 的 DOM 元素（用來取得座標）
}

// 一條已完成的連線
export interface ConnectedLine {
  id: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
}
