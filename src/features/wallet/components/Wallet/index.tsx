import { Card } from 'antd';
import { useWallet } from 'features/wallet';

export const Wallet = () => {
  const { data, isLoading, isError } = useWallet();

  console.log('wallet data', data);
  return (
    <div>
      {isLoading && 'Loading...'}
      {isError && 'Rejected...'}
      <Card title="Wallet info" bordered={false} style={{ width: 300 }}>
        <p>Balance: {}</p>
        <br />
        <p>Address: {}</p>
      </Card>
    </div>
  );
};
