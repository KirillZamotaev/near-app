import { Card } from 'antd';
import { useWallet } from 'features/wallet';
import { Spinner } from 'routing/components/Loader';

export const Wallet = () => {
  const { data, isLoading } = useWallet();

  return (
    <div>
      <Card title="Wallet info" bordered={false} style={{ width: 300 }}>
        {isLoading && <Spinner />}
        {data && (
          <>
            <p>Address: {data.address}</p>

            <br />
            <p>Balance: {data.balance}</p>
          </>
        )}
      </Card>
    </div>
  );
};
