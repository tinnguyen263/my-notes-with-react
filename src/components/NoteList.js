import React, {Component} from 'react';
import Note from './Note';
import {getPosition, getSize, moveElement, resizeElement} from '../utils/element';
import {createExpandAnimation} from '../utils/animations';
import {connect} from 'react-redux';
import {wait} from '../utils/timer';

const mapStateToProps = (state) => ({
  notes: state.data.notes,
});

export default connect(mapStateToProps)(class NoteList extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      selectedNote: null,
      selectedNoteElement: null,
    };
    this.overlayRef = React.createRef();
  }

  render() {
    const computeNoteClasses = (note) => this.state.selectedNote ?
        (note.id === this.state.selectedNote.id) ? 'selected' : 'not-selected' :
        '';
    return (
      <div className={`note-list ${this.state.selectedNote && 'has-selected'} ${this.props.className}`}
        ref={this.containerRef}>
        {this.props.notes.map((note) =>
          <Note key={note.id}
            id={note.id}
            note-data={note}
            className={computeNoteClasses(note)}
            onClick={(e) => this.selectNote(note, e.target)}/>)
        }
        <div className="overlay-note hide no-transition" ref={this.overlayRef}
          onClick={(e) => this.deSelectNote(this.state.selectedNote, e.target)}/>
      </div>
    );
  }

  async setStateAsync(newState, callback) {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        callback && callback();
        resolve();
      });
    });
  }

  async selectNote(note, element) {
    await this.setStateAsync({
      selectedNote: note,
      selectedNoteElement: element,
    });
    await this._showOverlay();
    await this._expandOverlay();
  }

  async deSelectNote() {
    await this._collapseOverlay();
    await this._hideOverlay();
    await this.setStateAsync({
      selectedNote: null,
      selectedNoteElement: null,
    });
  }

  async _showOverlay() {
    const card = this.state.selectedNoteElement;
    const overlay = this.overlayRef.current;
    const cardSize = getSize(card);
    const cardPosition = getPosition(card);
    // silently place overlay over selected note
    overlay.classList.add('no-transition');
    overlay.classList.remove('gone');
    resizeElement(overlay, cardSize.width, cardSize.height);
    moveElement(overlay, cardPosition.top, cardPosition.left);
    await wait(0);
    // the show it with animation
    overlay.classList.remove('no-transition');
    overlay.classList.remove('hide');
    return wait(200);
  }

  async _hideOverlay() {
    const overlay = this.overlayRef.current;
    // hide overlay with animation
    overlay.classList.remove('no-transition');
    overlay.classList.add('hide');
    await wait(200);
    // then silently reset it
    overlay.classList.add('no-transition');
    overlay.classList.add('gone');
    resizeElement(overlay, 0, 0);
    moveElement(overlay, 0, 0);
  }

  async _expandOverlay() {
    const card = this.state.selectedNoteElement;
    const container = this.containerRef.current;
    const overlay = this.overlayRef.current;
    const expandAnimation = createExpandAnimation(card, overlay, container);
    return expandAnimation.start();
  }

  async _collapseOverlay() {
    const card = this.state.selectedNoteElement;
    const container = this.containerRef.current;
    const overlay = this.overlayRef.current;
    const expandAnimation = createExpandAnimation(card, overlay, container);
    return expandAnimation.startReverse();
  }
});


