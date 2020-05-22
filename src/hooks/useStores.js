import React from 'react';
import { storeContext } from '../stores';

export const useStores = () => React.useContext(storeContext);