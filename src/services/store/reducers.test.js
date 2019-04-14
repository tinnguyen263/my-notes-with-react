import {rootReducer as reducer} from './reducers';
import {initialState} from './state';
import {createNote, deleteNote, updateNote} from './actions';

describe('[Redux] [Reducer] Store', () => {
  it('should return the initial state', () => {
    const testResult = reducer(undefined, {});
    const expectation = initialState;
    expect(testResult).toEqual(expectation);
  });
});

describe('[Redux] [Reducer] Notes', () => {
  const note1 = {
    id: 'randomId',
    title: 'Note Label',
    content: 'Note content',
  };
  const note2 = {
    id: 'randomId2',
    title: 'Note Label 2',
    content: 'Note content 2',
  };
  it('can create new note', () => {
    const currentState = initialState;
    const newNote = note1;
    const nextState = Object.assign({}, currentState, {
      data: {
        notes: [newNote],
      },
    });
    const testResult = reducer(initialState, createNote(newNote));
    expect(testResult).toEqual(nextState);
  });
  it('can create other new note', () => {
    const currentState = Object.assign({}, initialState, {
      data: {
        notes: [note1],
      },
    });
    const newNote = note2;
    const nextState = Object.assign({}, currentState, {
      data: {
        notes: [note1, note2],
      },
    });
    const testResult = reducer(currentState, createNote(newNote));
    expect(testResult).toEqual(nextState);
  });
  it('can update a note', () => {
    const currentState = Object.assign({}, initialState, {
      data: {
        notes: [note1, note2],
      },
    });
    const newNote1 = {
      ...note1,
      title: 'updated title',
      content: 'updated content',
    };
    const nextState = Object.assign({}, currentState, {
      data: {
        notes: [newNote1, note2],
      },
    });
    const testResult = reducer(currentState, updateNote(newNote1));
    expect(testResult).toEqual(nextState);
  });
  it('can delete a note', () => {
    const currentState = Object.assign({}, initialState, {
      data: {
        notes: [note1, note2],
      },
    });
    const noteToDelete = note1;
    const nextState = Object.assign({}, currentState, {
      data: {
        notes: [note2],
      },
    });
    const testResult = reducer(currentState, deleteNote(noteToDelete));
    expect(testResult).toEqual(nextState);
  });
});
