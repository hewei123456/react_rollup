import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/es/storage/session'
import { createLogger } from 'redux-logger'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

const persistConfig = {
  key: 'root',
  storage,
  transforms: [immutableTransform()],
  whitelist: ['user', 'files']
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

export { store, persistor }
