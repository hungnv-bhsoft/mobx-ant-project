import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores';


const ProtectedRoute = observer(({ children,...rest }) => {
    const { userStore } = useStores();
    return (
        <Route
        {...rest}
        render={({ location }) =>
        userStore.jwToken !== null ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/adminlogin",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
});

export default ProtectedRoute;
