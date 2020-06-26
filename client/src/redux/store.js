import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

export default { store, persistor }