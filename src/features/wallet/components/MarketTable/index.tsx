import { Table } from 'antd';
import { useTableMarketData } from 'features/market';
import { utils } from 'near-api-js';
import { useMemo } from 'react';

const renderSize = (value: string) => <span>{value}</span>; // utils.format.formatNearAmount(value);

const render = (value: string) => <span>{value}</span>;

export const MarketTable = () => {
  const { data, isLoading } = useTableMarketData();

  const columns = useMemo(
    () => [
      {
        title: 'Price',
        dataIndex: 'price',
        render,
      },
      {
        title: 'Size',
        dataIndex: 'quantity',
        render: renderSize,
      },
      {
        title: 'Total',
        dataIndex: 'quantity',
        render,
      },
    ],
    []
  );

  return (
    <div className="MarketTable">
      <h3>Ask orders</h3>
      <Table
        loading={isLoading}
        dataSource={data.ask_orders}
        columns={columns}
      />
      <h3>Bid orders</h3>
      <Table
        loading={isLoading}
        dataSource={data.bid_orders}
        columns={columns}
      />
    </div>
  );
};
