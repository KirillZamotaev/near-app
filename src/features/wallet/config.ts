import { CONTRACT_TEST_NAME, CONTRACT_TESTNET_PATH } from 'constant';
import { keyStores } from 'near-api-js';

const CONTRACT_NAME = process.env.CONTRACT_NAME || CONTRACT_TEST_NAME;

export function getConfig(env: string) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
      };
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: `${CONTRACT_TESTNET_PATH}${CONTRACT_NAME}`,
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}
