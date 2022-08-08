import { Page } from 'routing/components/Page';
import { Wallet, MarketTable, MarketSelect } from 'features/wallet/components';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Main = () => {

  const params = useSearchParams();


  console.log('params');

  useEffect(() => {
    function populateStorage() {
      console.log('params', params);
      localStorage.setItem('params', params.toString());
    }

    populateStorage();
  }, [params]);

  return (
    <Page>
      <Wallet />
      <br />
      <MarketSelect />
      <br />
      <MarketTable />
    </Page>
  );
};
