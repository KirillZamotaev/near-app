import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, signIn, signOut, signInCheck } from 'features/user';
import { useNavigate } from 'react-router';
import { WalletApi } from 'features/wallet/walletApi';

export const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(userSelector);

  useEffect(() => {
    if (userState.isSignedIn) {
      navigate('/');
    } else {
      navigate('/signin');
    }
  }, [navigate, userState.isSignedIn]);

  const handleSingIn = (args: any) => {
    dispatch<any>(signIn(args));
    setTimeout(() => {
        WalletApi.requestSingIn()
    }, 1500);
  };

  useEffect(() => {
    signInCheck();
  }, []);

  return {
    ...userState,
    signIn: handleSingIn,
    signOut: () => dispatch<any>(signOut()),
  };
};
