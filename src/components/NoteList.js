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
    moveTo(overlay, cardPosition.top, cardPosition.left);
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

    const maximumExpandSize = {
      top: +overlayPosition.top,
      right: containerSize.width - (overlayPosition.left + overlaySize.width),
      bottom: containerSize.height - (overlayPosition.top + overlaySize.height),
      left: +overlayPosition.left,
    };
    const biggestDistance = Object.values(maximumExpandSize).sort().pop();
    const calculateSpaceToAdd = (progress, maximumSpace) => (progress * biggestDistance) < maximumSpace ? (progress * biggestDistance) : maximumSpace;

    const step = progress => {
      const newOverlayExpandSize = {
        top: calculateSpaceToAdd(progress, maximumExpandSize.top),
        right: calculateSpaceToAdd(progress, maximumExpandSize.right),
        bottom: calculateSpaceToAdd(progress, maximumExpandSize.bottom),
        left: calculateSpaceToAdd(progress, maximumExpandSize.left),
      };
      const newOverlayPosition = {
        top: overlayPosition.top - newOverlayExpandSize.top,
        left: overlayPosition.left - newOverlayExpandSize.left
      };
      const newSize = {
        width: overlaySize.width + newOverlayExpandSize.left + newOverlayExpandSize.right,
        height: overlaySize.height + newOverlayExpandSize.top + newOverlayExpandSize.bottom
      };
      resizeTo(overlay, newSize.width, newSize.height);
      moveTo(overlay, newOverlayPosition.top, newOverlayPosition.left);
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
  let startMoment = null;
  const frame = (timestamp) => {
    if (!startMoment) startMoment = timestamp;
    const passedTime = timestamp - startMoment;
    let progressInPercent = passedTime / duration;
    if (progressInPercent > 1) progressInPercent = 1;
    const shouldAnimationContinue = progressInPercent < 1;
    stepper(progressInPercent);
    if (shouldAnimationContinue) {
      window.requestAnimationFrame(frame);
    } else {
      resolve()
    }
  };
  window.requestAnimationFrame(frame);
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
