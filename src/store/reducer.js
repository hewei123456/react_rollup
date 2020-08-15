import undoable from 'redux-undo'
import { combineReducers } from 'redux'
import { reducer as user } from './user'
import { reducer as files, FILES_UN_DO, FILES_RE_DO } from './files'

export default combineReducers({
  user,
  files: undoable(files, {
    undoType: FILES_UN_DO,
    redoType: FILES_RE_DO
  })
})
