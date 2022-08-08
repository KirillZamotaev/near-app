import { Card } from 'antd';
import { useWallet } from 'features/wallet';

export const Wallet = () => {
  const { data, isLoading, isError } = useWallet();

  return (
    <div>
      {isLoading && 'Loading...'}
      {isError && 'Rejected...'}
      <Card title="Wallet info" bordered={false} style={{ width: 300 }}>
        <p>Balance: {data.balance}</p>
        <br />
        <p>Address: {data.address}</p>
      </Card>
    </div>
  );
};
