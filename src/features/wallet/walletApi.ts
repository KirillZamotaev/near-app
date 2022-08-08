import {
  connect,
  Contract,
  WalletConnection,
  //   utils,
  //   providers,
  Near,
  ConnectConfig,
} from 'near-api-js';
import { getConfig } from './config';

// type NearConfig = ConnectConfig & {
//   contractName: string;
//   headers: {
//     [key: string]: string | number;
//   };
// };

class IWalletApi {
  nearConfig: any = {};
  near: Near = {} as Near;
  contract: any = {};
  walletConnection: WalletConnection = {} as WalletConnection;

  requestSingOut = async () => { 
    try {
      const request = await this.walletConnection.signOut();
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

    this.near = await connect(this.nearConfig as ConnectConfig);
    console.log('near', this.nearConfig);

    this.walletConnection = new WalletConnection(this.near, 'near-app-test');
    console.log('walletConnection', this.walletConnection);

    this.contract = await new Contract(
      this.walletConnection.account(),
      this.nearConfig.contractName,
      {
        viewMethods: ['beneficiary', 'get_donations', 'total_donations'],
        changeMethods: ['donate'],
      }
    );

    console.log('contract', this.contract);
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
