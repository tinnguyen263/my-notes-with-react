import React, {Component} from 'react';
import Note from './Note';
import {getPosition, getSize} from "../utils/index.";

export default class NoteList extends Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      notes: mockNotes,
      selectedNote: null,
      selectedNoteElement: null
    };
    this.overlayRef = React.createRef();
  }

  render() {
    const computeNoteClasses = note => this.state.selectedNote ? note.id === this.state.selectedNote.id ? 'selected' : 'gone' : '';
    return (
      <div className={`note-list ${this.state.selectedNote && 'has-selected'} ${this.props.className}`}
           ref={this.containerRef}>
        {this.state.notes.map(note =>
          <Note key={note.id}
                id={note.id}
                note-data={note}
                className={computeNoteClasses(note)}
                onClick={e => this.selectNote(note, e.target)}/>)
        }
        <div className="overlay-note hide no-transition" ref={this.overlayRef}
             onClick={e => this.deSelectNote(this.state.selectedNote, e.target)}/>
      </div>
    )
  }

  async setStateAsync(newState, callback) {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        callback && callback();
        resolve();
      })
    })
  }

  async selectNote(note, element) {
    await this.setStateAsync({
      selectedNote: note,
      selectedNoteElement: element
    });
    await this._showOverlay();
    await this._expandOverlay();
  }

  async deSelectNote() {
    await this._collapseOverlay();
    await this._hideOverlay();
    await this.setStateAsync({
      selectedNote: null,
      selectedNoteElement: null
    });
  }

  async _showOverlay() {
    const card = this.state.selectedNoteElement;
    const overlay = this.overlayRef.current;
    const cardSize = getSize(card);
    const cardPosition = getPosition(card);
    disableAnimation(overlay);
    resizeTo(overlay, cardSize.width, cardSize.height);
    moveTo(overlay, cardPosition.x, cardPosition.y);
    overlay.style.visibility = 'unset';
    await wait(0);
    enableAnimation(overlay);
    overlay.classList.remove('hide');
    return wait(200)
  }

  async _hideOverlay() {
    const overlay = this.overlayRef.current;

    enableAnimation(overlay);
    overlay.classList.add('hide');
    await wait(200, () => {
      disableAnimation(overlay);
      overlay.style.visibility = 'hidden';
      resizeTo(overlay, 0, 0);
      moveTo(overlay, 0, 0);
    });

  }

  async _expandOverlay() {
    // const container = this.containerRef.current;
    // const overlay = this.overlayRef.current;
    // const containerSize = getSize(container);
    //
    // resizeTo(overlay, containerSize.width, containerSize.height);
    // moveTo(overlay, 0, 0);
    // return wait(400)

    const card = this.state.selectedNoteElement;
    const container = this.containerRef.current;
    const containerSize = getSize(container);

    const overlay = this.overlayRef.current;

    const overlayPosition = getPosition(card);
    const overlaySize = getSize(card);

    console.log(overlayPosition);

    const expandSize = {
      top: +overlayPosition.x,
      right: containerSize.width - (overlayPosition.y + overlaySize.width),
      bottom: containerSize.height - (overlayPosition.x + overlaySize.height),
      left: +overlayPosition.y,
    };
    const biggestDistance = Object.values(expandSize).sort()[0];
    const calculate = (maxSize, progress) => {
      const tryValue = biggestDistance * progress;
      return tryValue < maxSize ? tryValue : maxSize
    };

    const step = progress => {
      const newExpandSize = {
        top: calculate(expandSize.top, progress),
        right: calculate(expandSize.right, progress),
        bottom: calculate(expandSize.bottom, progress),
        left: calculate(expandSize.left, progress),
      };
      const newPosition = {
        y: overlayPosition.y - newExpandSize.left,
        x: overlayPosition.x - newExpandSize.top
      };
      const newSize = {
        width: overlaySize.width + newExpandSize.left + newExpandSize.right,
        height: overlaySize.height + newExpandSize.top + newExpandSize.bottom
      };
      resizeTo(overlay, newSize.width, newSize.height);
      moveTo(overlay, newPosition.y, newPosition.x);
    };

    createAnimationFrame(step, 200)
  }

  async _collapseOverlay() {
    // const card = this.state.selectedNoteElement;
    // const overlay = this.overlayRef.current;
    // const cardSize = getSize(card);
    // const cardPosition = getPosition(card);
    // resizeTo(overlay, cardSize.width, cardSize.height);
    // moveTo(overlay, cardPosition.x, cardPosition.y);
    // return wait(400)
  }
}

const wait = (duration, callback) => new Promise((resolve) => setTimeout(() => {
  callback && callback();
  resolve();
}, duration));

const enableAnimation = element => {
  element.classList.remove('no-transition');
};
const disableAnimation = element => {
  element.classList.add('no-transition');
};
const moveTo = (element, top, left) => {
  top += 'px';
  left += 'px';
  element.style.transform = `translate3D(${left}, ${top}, 0)`;
};
const resizeTo = (element, width, height) => {
  width += 'px';
  height += 'px';
  element.style.maxWidth = width;
  element.style.maxHeight = height;

};

const createAnimationFrame = (stepper, duration) => new Promise(resolve => {
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const passedTime = timestamp - start;
    let progress = passedTime / duration;
    if (progress > 1) progress = 1;
    stepper(progress);
    const shouldAnimationContinue = progress < 1;
    if (shouldAnimationContinue) {
      window.requestAnimationFrame(step);
    } else {
      resolve()
    }
  }
  window.requestAnimationFrame(step);
});

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
  createMockNote()
];
