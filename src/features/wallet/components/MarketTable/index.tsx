import { Table } from 'antd';
import { useTableMarketData } from 'features/wallet/';
import { useMemo } from 'react';

export const MarketTable = () => {
  const { data, isLoading } = useTableMarketData();

  const columns = useMemo(
    () => [
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text: string) => <span>{text}</span>,
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: (text: string) => <span>{text}</span>,
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text: string) => <span>{text}</span>,
      },
    ],
    []
  );

  return (
    <div className="MarketTable">
      <Table loading={isLoading} dataSource={data} columns={columns} />
    </div>
  );
};
