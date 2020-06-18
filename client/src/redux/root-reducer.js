import { combineReducers } from 'redux';
import shopReducer from './shop/shop.reducer';

const rootReducer = combineReducers({
    shop: shopReducer
})

export default rootReducer;