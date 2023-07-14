export interface Signature {
  signatureType: number;
  r: string;
  s: string;
  v: number;
}

export interface Order {
  order: {
    makerAmount: string;
    takerAmount: string;
    makerToken: string;
    takerToken: string;
  };
}

export interface OrderResponse {
  order: Order;
}
export interface OrderBookResponse {
  asks: {
    records: Order[];
  };
  bids: {
    records: Order[];
  };
}
