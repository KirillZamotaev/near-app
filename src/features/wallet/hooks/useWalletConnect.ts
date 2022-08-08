import { useEffect } from 'react';
import { walletSelector } from '../selector';
import { connectWallet } from '../reducer';
import { useSelector } from 'react-redux';

export const useWalletConnect = () => {
    const walletState = useSelector(walletSelector);

    useEffect(() => {
        connectWallet();
    }, []);

    return  { 
        ...walletState,
    }
}