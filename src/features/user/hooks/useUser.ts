import { useSelector } from "react-redux";
import { userSelector } from "../selector";

export const useUser = () => {
    const userState = useSelector(userSelector);


    return {
        ...userState,
    }
}