import { walletSelector } from '../selector';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from 'features/wallet';
import { useEffect } from 'react';

export const useWallet = () => {
    const walletState = useSelector(walletSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(connectWallet())
    }, [dispatch])

    return  { 
        ...walletState,
    }
}