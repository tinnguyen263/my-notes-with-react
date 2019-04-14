import {ActionTypes} from './action-types';

export const createNote = (note) => ({
  type: ActionTypes.DATA_NOTE_CREATE,
  payload: note,
});

export const updateNote = (note) => ({
  type: ActionTypes.DATA_NOTE_UPDATE,
  payload: note,
});

export const deleteNote = (note) => ({
  type: ActionTypes.DATA_NOTE_DELETE,
  payload: note,
});

export const deleteById = (noteId) => ({
  type: ActionTypes.DATA_NOTE_DELETE,
  payload: {
    id: noteId,
  },
});
