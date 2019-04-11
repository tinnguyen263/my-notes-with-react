import {initialState} from "./state";
import {ActionTypes} from './action-types'
import {combineReducers} from "redux";
import Collection from "../../utils/Collection";

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const noteReducer = (state = initialState.data.notes, action) => {
  switch (action.type) {
    case ActionTypes.DATA_NOTE_CREATE:
      return Collection.addItem(state, action.payload);
    case ActionTypes.DATA_NOTE_UPDATE:
      return Collection.updateItem(state, action.payload);
    case ActionTypes.DATA_NOTE_DELETE:
      return Collection.deleteItem(state, action.payload);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  app: appReducer,
  data: combineReducers({
    notes: noteReducer
  })
});
