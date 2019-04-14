import {initialState} from './state';
import {ActionTypes} from './action-types';
import {combineReducers} from 'redux';
import {ArrayCollection} from '../../utils/collection';

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const noteReducer = (state = initialState.data.notes, action) => {
  switch (action.type) {
    case ActionTypes.DATA_NOTE_CREATE:
      return ArrayCollection.of(state).addItem(action.payload);
    case ActionTypes.DATA_NOTE_UPDATE:
      return ArrayCollection.of(state).updateItem(action.payload);
    case ActionTypes.DATA_NOTE_DELETE:
      return ArrayCollection.of(state).deleteItem(action.payload);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  app: appReducer,
  data: combineReducers({
    notes: noteReducer,
  }),
});
