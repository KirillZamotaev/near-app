import {
  connect,
  Contract,
  WalletConnection,
  //   utils,
  //   providers,
  Near,
} from 'near-api-js';
import { getConfig } from './config';

class IWalletApi {
  nearConfig: any;
  near: Near;
  contract: any;
  walletConnection: any;

  constructor() {
    this.initContract();
  }

  requestSingOut = async () => {
    console.log('request signout');
    try {
      const request = await this.walletConnection.requestSingOut();
      return request;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  requestSingIn = async (values: Record<string, string | number>) => {
    console.log('request signin values', values);
    try {
      const request = await this.walletConnection.requestSignIn(
        this.nearConfig.contractName
      );
      return request;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  checkSignIn = () => {
    return this.walletConnection.isSignedIn();
  };

  initContract = async () => {
    this.nearConfig = await getConfig(process.env.NODE_ENV || 'development');
    console.log('nearConfig', this.nearConfig);
    // Set a connection to the NEAR network
    this.near = await connect(this.nearConfig);

    // Initialize a Wallet Object
    this.walletConnection = new WalletConnection(this.near, 'near-app-test');

    // Initialize a Contract Object (to interact with the contract)
    this.contract = await new Contract(
      this.walletConnection.account(), // user's account
      this.nearConfig.contractName, // contract's account
      {
        viewMethods: ['beneficiary', 'get_donations', 'total_donations'],
        changeMethods: ['donate'],
      }
    );
  };

  latestDonations = async () => {
    const total_donations = await this.contract.total_donations();

    const min = total_donations > 10 ? total_donations - 9 : 0;

    let donations = await this.contract.get_donations({
      from_index: min.toString(),
      limit: total_donations,
    });

    return donations;
  };

  getMarkets = async () => {
    let markets = await this.contract.markets({});

    return markets;
  };

  viewMarket = async (marketId: string) => {
    let market = await this.contract.view_market({ market_id: marketId });

    return market;
  };
}

export const WalletApi = new IWalletApi();
