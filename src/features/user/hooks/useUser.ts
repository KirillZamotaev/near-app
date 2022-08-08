import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, signIn, signOut, signInCheck } from 'features/user';
import { useNavigate } from 'react-router';

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

  useEffect(() => {
    signInCheck();
  }, []);

  return {
    ...userState,
    signIn: (args: any) => dispatch<any>(signIn(args)),
    signOut: () => dispatch<any>(signOut()),
  };
};
