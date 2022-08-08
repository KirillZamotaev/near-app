import { useSelector } from "react-redux";
import { userSelector, signIn } from "features/user";

export const useUser = () => {
    const userState = useSelector(userSelector);

    return {
        ...userState,
        signIn,
    }
}