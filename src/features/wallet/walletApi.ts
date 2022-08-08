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

  checkSignIn = () => {
    return window.walletConnection.isSignedIn()
  }

  connect = async () => {
    const config = await this.getConfig();
    const contractData = await this.initContract();

    return {
        config,
        contractData,
    }
  }

  getConfig = async () => {
    this.nearConfig = await getConfig(process.env.NODE_ENV || 'development');
    return this.nearConfig;
  };

  initContract = async () => {
    const { nearConfig } = this;
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
  }

  latestDonations = async () => {
    const total_donations = await window.contract.total_donations()
  
    const min = total_donations > 10 ? total_donations - 9 : 0
  
    let donations = await window.contract.get_donations({ from_index: min.toString(), limit: total_donations })
    
    return donations
  }

  getMarkets = async () => {
    let markets = await this.contract.markets({})
    
    return markets
  }
}

export const WalletApi = new IWalletApi();
