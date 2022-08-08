import { useEffect } from 'react';
import { WalletApi } from '../walletApi';
import { useState } from 'react';
import { MarketItem } from 'intefaces';

export const useMarketData = () => {
  const [data, setData] = useState<MarketItem[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getMarkets = async () => {
      setLoading(true);

      try {
        const markets = await WalletApi.getMarkets();
        setData(markets);
      } catch (err) {
        //...//
      }

      setLoading(false);
    };

    getMarkets();
  }, []);

  return {
    data,
    isLoading,
  };
};
