const sample_store = {
  data: {
    notes: []
  }
};


class Collection {
  constructor(array) {
    this.items = array
  }

  static of(array) {
    return new Collection(array)
  }

  getAll() {
    return [...this.items]
  }

  _genId() {
    const latestItem = this.items[this.items.length - 1];
    const latestItemId = latestItem ? latestItem.id : -1;
    return latestItemId + 1;
  }

  getItem(id) {
    if (!id) return null;
    return this.items.find(item => item.id === id) || null;
  }

  addItem(item) {
    if (!item) return null;
    item.id = this._genId();
    this.items = [...this.items, item];
    return item;
  }

  updateItem(item) {
    if (!item) return null;
    const itemExist = this.get(item.id);
    if (!itemExist) return null;
    let updater = itemInItems => itemInItems.id === item.id ? item : itemInItems;
    this.items = this.items.map(updater);
    return item;
  }

  deleteItem(item) {
    if (!item) return null;
    const itemExist = this.get(item.id);
    if (!itemExist) return null;
    let filter = itemInItems => itemInItems.id === item.id ? item : itemInItems;
    this.items = this.items.filter(filter);
    return item;
  }
}

const getAllNotes = () => Collection.of(sample_store.data.notes).getAll();
const createNote = note => Collection.of(sample_store.data.notes).addItem(note);
const updateNote = note => Collection.of(sample_store.data.notes).updateItem(note);
const deleteNote = note => Collection.of(sample_store.data.notes).deleteItem(note);

const NoteService =  { getAllNotes, createNote, updateNote, deleteNote };

export { NoteService }
