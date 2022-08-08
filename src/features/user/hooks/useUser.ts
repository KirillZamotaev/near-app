import { useEffect  } from 'react';
import { useSelector } from "react-redux";
import { userSelector, signIn, signInCheck } from "features/user";

export const useUser = () => {
    const userState = useSelector(userSelector);

    useEffect(() => {
        signInCheck();
    }, [])

    return {
        ...userState,
        signIn,
    }
}