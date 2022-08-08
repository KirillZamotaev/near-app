import { Select } from 'antd';
import { setSelectedMarket } from 'features/market';
import { useMarketData } from 'features/market/hooks/useMarketData';
import { MarketItem } from 'intefaces';
import { useDispatch } from 'react-redux';
import './MarketSelect.css';

const { Option } = Select;

export const MarketSelect = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useMarketData();

  const handleChangeMarket = (itemId: string) => {
    const item = data.find((el: MarketItem) => el.id === itemId);
    console.log('item', itemId, data, item);
    dispatch(setSelectedMarket(item));
  }

  return (
    <div className="MarketSelect">
      <Select loading={isLoading} onChange={handleChangeMarket} className="MarketSelect__select">
        {data.map((item) => {
          return (
            <Option key={item.base.ticker} value={item.id} label={item.base.ticker}>
              {item.base.ticker}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
