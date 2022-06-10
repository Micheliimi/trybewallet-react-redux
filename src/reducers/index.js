import { combineReducers } from 'redux';
import UserReducer from './user';
import walletReducer from './wallet';

const rootReducer = combineReducers({ user: UserReducer, wallet: walletReducer });

export default rootReducer;
