import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import File from './views/File'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import './style/index.less'
import './index.less'

const App = () => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <div id="root">
        <Scrollbars hideTracksWhenNotNeeded>
          <div className="root-container">
            <Scrollbars hideTracksWhenNotNeeded>
              <File />
            </Scrollbars>
          </div>
        </Scrollbars>
      </div>
    </PersistGate>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))