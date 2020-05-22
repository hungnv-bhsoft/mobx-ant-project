import React from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../hooks/useStores';

export const Counter = () => {
    const { countStore } = useStores();

    return useObserver(() => (
        <>
            <div>{countStore.doubleCount}</div>
            <button onClick={() => countStore.increment()}>++</button>
            <button onClick={() => countStore.decrement()}>--</button>
        </>
    ));
}