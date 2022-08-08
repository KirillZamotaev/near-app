import { Page } from 'routing/components/Page';
import { Wallet, MarketTable, MarketSelect } from 'features/wallet/components';
export const Main = () => (
  <Page>
    <Wallet />
    <br />
    <MarketSelect />
    <br />
    <MarketTable />
  </Page>
);
