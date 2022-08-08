import { Card } from 'antd';
import { useWallet } from 'features/wallet';
import { Spinner } from 'routing/components/Loader';
import { utils } from 'near-api-js';

export const Wallet = () => {
  const { data, isLoading } = useWallet();

  const formatter = (value: number) => {};

  return (
    <div>
      <Card title={<h2>Wallet</h2>} style={{ width: 400 }}>
        {isLoading && <Spinner />}
        {data && (
          <>
            <h3>
              Address: <b>{data.address}</b>
            </h3>
            {data.balance && (
              <>
                <h4>Balance: </h4>
                <ul>
                  <li>
                    <p>
                      Total: <b>{data.balance.total}</b>
                    </p>
                  </li>
                  <li>
                    <p>
                      Staked: <b>{data.balance.staked}</b>
                    </p>
                  </li>
                  <li>
                    {' '}
                    <p>
                      Available: <b>{data.balance.available}</b>
                    </p>
                  </li>
                  <li>
                    {' '}
                    <p>
                      State staked: <b>{data.balance.stateStaked}</b>
                    </p>
                  </li>
                </ul>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
