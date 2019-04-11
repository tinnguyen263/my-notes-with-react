import React, { Component } from 'react';
import Note from './Note';
import {getPosition, getSize} from "../utils/index.";

export default class NoteList extends Component{

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      notes: mockNotes,
      selectedNote: null
    };
  }

  render() {
    const computeNoteClasses = note => note.id === (this.state.selectedNote && this.state.selectedNote.id) ? 'selected' : '';
    return (
      <div className={`note-list ${this.state.selectedNote && 'has-selected'} ${this.props.className}`} ref={this.containerRef}>
        {this.state.notes.map(note =>
          <Note key={note.id}
                id={note.id}
                note-data={note}
                className={computeNoteClasses(note)}
                onClick={this.selectNote.bind(this, note)}/>)
        }
      </div>
    )
  }

  selectNote (note) {
    this.setState({
      selectedNote: note
    });
    // update url
    // expand card
    // const element = document.getElementById(note.id)
    // let card = {
    //   position: getPosition(element),
    //   size: getSize(element)
    // };
    // let container = {
    //   position: getPosition(this.containerRef.current),
    //   size: getSize(this.containerRef.current)
    // };
    // console.log(`translate3D(${-card.position.x},${-card.position.y},0)`);
    // element.style.transform = `translate3D(${-card.position.x}px,${-card.position.y}px,0)`
  }
}

const createMockNote = () => {
  const id = Math.random();
  return {
    id,
    title: 'Title of ' + id,
    content: 'Content of ' + id,
  }
};
const mockNotes = [
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote(),
  createMockNote()
];
