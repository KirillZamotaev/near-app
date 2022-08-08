import {
  connect,
  Contract,
  WalletConnection,
  utils,
  //   providers,
  Near,
  ConnectConfig,
} from 'near-api-js';
import { getConfig } from './config';

declare global {
  interface Window {
    nearConfig: any;
    near: Near;
    contract: any;
    walletConnection: WalletConnection;
  }
}


class IWalletApi {
  requestSignOut = async () => { 
    try {
      const request = await window.walletConnection.signOut();
      return request;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  requestSignIn = () => {
    window.walletConnection.requestSignIn(window.nearConfig.contractName);
  };

  checkSignIn = () => {
    return window.walletConnection.isSignedIn();
  };

  initContract = async () => {
    window.nearConfig = await getConfig(process.env.NODE_ENV || 'development');
    console.log('nearConfig', window.nearConfig);

    window.near = await connect(window.nearConfig as ConnectConfig);
    console.log('near', window.nearConfig);

    window.walletConnection = new WalletConnection(window.near, 'near-app-test');
    console.log('walletConnection', window.walletConnection);

    window.contract = await new Contract(
      window.walletConnection.account(),
      window.nearConfig.contractName,
      {
        viewMethods: ['beneficiary', 'get_donations', 'total_donations', 'markets', 'view_market', 'get_deposit'],
        changeMethods: ['donate'],
      }
    );

    console.log('contract', window.contract);
  };

  latestDonations = async () => {
    const total_donations = await window.contract.total_donations();

    const min = total_donations > 10 ? total_donations - 9 : 0;

    let donations = await window.contract.get_donations({
      from_index: min.toString(),
      limit: total_donations,
    });

    return donations;
  };

  getAccountData = async () => {
    const account = await window.near.account(this.getAddress())
    const balance = await account.getAccountBalance();
    const details = await account.getAccountDetails();
    return {
      balance,
      details,
    }
  };

  getMarkets = async () => {
    let markets = await window.contract.markets({});

    return markets;
  };

  getAddress = () => {
      return window.contract.account.accountId;
  }

  viewMarket = async (marketId: string) => {
    console.log('getting market', marketId);
    try {
      let market = await window.contract.view_market({ market_id: +marketId });
      console.log('--->', market);
      return market;
    } catch(err) {
      console.log('-->', err);
    }
    return {};
  };
}

export const WalletApi = new IWalletApi();
