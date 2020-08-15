import { fromJS } from 'immutable'
import { v4 } from 'uuid'

/* ------------types------------- */
export const ADD_FILE = 'ADD_FILE'
export const ADD_FILES = 'ADD_FILES'
export const UPDATE_FILE_CONTENT = 'UPDATE_FILE_CONTENT'
export const UPDATE_FILE_Name = 'UPDATE_FILE_Name'
export const DELETE_FILE = 'DELETE_FILE'
export const CLEAR_FILE_LIST = 'CLEAR_FILE_LIST'
export const FILES_UN_DO = 'FILES_UN_DO'
export const FILES_RE_DO = 'FILES_RE_DO'

/* ------------actions------------- */
export const addFile = name => (
  { type: ADD_FILE, name }
)

export const addFiles = files => (
  { type: ADD_FILES, files }
)

export const updateFileContent = (id, content) => (
  { type: UPDATE_FILE_CONTENT, id, content }
)

export const updateFileName = (id, name) => (
  { type: UPDATE_FILE_Name, id, name }
)

export const deleteFile = id => (
  { type: DELETE_FILE, id }
)

export const clearFileList = () => (
  { type: CLEAR_FILE_LIST }
)

export const filesUndo = () => (
  { type: FILES_UN_DO }
)

export const filesRedo = () => (
  { type: FILES_RE_DO }
)

/* ------------reducer------------- */
const defaultState = fromJS({})

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FILE:
      var id = v4()
      return state.set(id, fromJS({
        id,
        name: action.name,
        content: ''
      }))

    case ADD_FILES:
      return state.merge(fromJS(action.files))

    case UPDATE_FILE_CONTENT:
      return state.setIn([action.id, 'content'], action.content)

    case UPDATE_FILE_Name:
      return state.setIn([action.id, 'name'], action.name)

    case CLEAR_FILE_LIST:
      return state.clear()

    case DELETE_FILE:
      return state.delete(action.id)

    default:
      return state
  }
}
