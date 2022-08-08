import {
  connect,
  Contract,
  WalletConnection,
  //   utils,
  //   providers,
  Near,
} from 'near-api-js';
import { getConfig } from './config';

declare global {
  interface Window {
    near: Near;
    contract: any;
    walletConnection: any;
  }
}

class IWalletApi {
  nearConfig: any;
  contract: any;

  requestSingIn = async () => {
    try {
    const request = await window.walletConnection.requestSignIn(this.nearConfig.contractName)
    return request;
    } catch (err) {
        console.log(err)
        return false
    }
  }

  checkSignIn = () => {
    return window.walletConnection.isSignedIn();
  };

  connect = async () => {
    try {
      const config = await this.getConfig();
      const contractData = await this.initContract();

      return {
        config,
        contractData,
      };
    } catch (err) {
      console.log('connect err::', err);
    }
  };

  getConfig = async () => {
    try {
      this.nearConfig = await getConfig(process.env.NODE_ENV || 'development');
      console.log('config', this.nearConfig);
      return this.nearConfig;
    } catch (err) {
      console.log('getConfig err::', err);
    }
  };

  initContract = async () => {
    const { nearConfig } = this;

    console.log('nearConfig', nearConfig);
    // Set a connection to the NEAR network
    window.near = await connect(nearConfig);

    // Initialize a Wallet Object
    window.walletConnection = new WalletConnection(
      window.near,
      'near-app-test'
    );

    // Initialize a Contract Object (to interact with the contract)
    window.contract = await new Contract(
      window.walletConnection.account(), // user's account
      nearConfig.contractName, // contract's account
      {
        viewMethods: ['beneficiary', 'get_donations', 'total_donations'],
        changeMethods: ['donate'],
      }
    );
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

  getMarkets = async () => {
    let markets = await window.contract.markets({});

    return markets;
  };

  viewMarket = async (marketId: string) => {
    let market = await this.contract.view_market({ market_id: marketId });

    return market;
  };
}

export const WalletApi = new IWalletApi();
