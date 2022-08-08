export interface MarketItem {
  market_id: number;
  base: {
    ticker: string;
    decimal: number;
    address: string;
  };
  quote: {
    ticker: string;
    decimal: number;
    address: string;
  };
  fee: number;
}

export interface Bid {
    ask_orders: [
      {
        price: number,
        quantity: number
      }
    ],
    bid_orders: [
      {
        price: number,
        quantity: number
      }
    ]
  }