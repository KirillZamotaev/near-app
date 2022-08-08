import { useUser } from 'features/user';
import { FC } from 'react' 
import { Navigate } from 'react-router-dom';

export const PrivateRoute: FC<{ element: React.ReactElement }> = ({ element }) => {
    const { isSignedIn } = useUser();

    if (!isSignedIn) {
        return <Navigate replace to="/signin" />
    }

    return element;
};