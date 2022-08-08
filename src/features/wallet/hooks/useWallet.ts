import { walletSelector } from '../selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWalletData } from '../reducer';


export const useWallet = () => {
    const walletState = useSelector(walletSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(getWalletData());
    }, [dispatch])

    return  { 
        ...walletState,
    }
}