import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'

const createElectronStorage = window.require('redux-persist-electron-storage')
const ElectronStore = window.require('electron-store')
const electronStore = new ElectronStore({ 'name': 'ReduxStore' })

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

const persistConfig = {
  key: 'root',
  storage: createElectronStorage({
    electronStore
  }),
  transforms: [immutableTransform()],
  whitelist: ['user', 'files']
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

store.subscribe(() => {
  console.log(123)
})

export { store, persistor }
