import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../hooks/useStores';
import history from '../../../utils/history';
import { toJS } from 'mobx';


const DashBoard = observer(() =>  {
    const { userStore } = useStores();
    React.useEffect(() => {
        userStore.checkAdmin();
    },[]);
    return (
        <div>
            DashBoard DashBoard
            <button onClick={ () => userStore.logout() }>Logout</button>
        </div>
    )
})

export default DashBoard;
