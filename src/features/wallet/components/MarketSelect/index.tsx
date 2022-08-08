import { Select } from 'antd' 
import { useMarketData } from 'features/wallet/hooks/useMarketData';
import './MarketSelect.css';

const { Option } = Select;

export const MarketSelect = () => {
    const { data, isLoading } = useMarketData();

    return <div className="MarketSelect">
        <Select loading={isLoading} className="MarketSelect__select">{data.map((item) => {
            return <Option value={item}>{item.base.ticker}</Option>
        })}</Select>
    </div>
}