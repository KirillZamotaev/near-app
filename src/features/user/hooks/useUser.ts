import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, signIn, signOut, checkSignIn } from 'features/user';
import { useNavigate } from 'react-router';
import { WalletApi } from 'features/wallet/walletApi';

export const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(userSelector);

  useEffect(() => {
    dispatch(checkSignIn());
  }, [dispatch]);

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
        WalletApi.requestSignIn()
    }, 1500);
  };

  return {
    ...userState,
    signIn: handleSingIn,
    signOut: () => dispatch<any>(signOut()),
  };
};
