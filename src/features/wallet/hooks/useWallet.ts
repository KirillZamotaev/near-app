import { walletSelector } from '../selector';
import { useSelector } from 'react-redux';


export const useWallet = () => {
    const walletState = useSelector(walletSelector);

    return  { 
        ...walletState,
    }
}