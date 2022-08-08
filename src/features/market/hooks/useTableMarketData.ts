import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { marketMarketDataSelector, marketSelectedMarketSelector } from '../selector';
import { getMarketData } from '../reducer';

export const useTableMarketData = () => {
  const dispatch = useDispatch();
  const market = useSelector(marketSelectedMarketSelector);
  const { data, isLoading } = useSelector(marketMarketDataSelector);

  useEffect(() => {
    if (market) {
      dispatch<any>(getMarketData(`${market.id}`));
    }
  }, [market, dispatch]);

  return {
    data,
    isLoading,
  };
};
