const ArrayCollection = {
  getAllItems: (collection) => [...collection],
  addItem: (collection, item) => [...collection, item],
  updateItem: (collection, item) => collection.map((i) => i.id === item.id ? item : i),
  deleteItem: (collection, item) => collection
      .reduce((newCollection, i) => [
        ...newCollection,
        ...(i.id === item.id ? [] : [i]),
      ], []),
  of: (items) => ({
    getAllItems: (items) => ArrayCollection.getAllItems(items),
    addItem: (item) => ArrayCollection.addItem(items, item),
    updateItem: (item) => ArrayCollection.updateItem(items, item),
    deleteItem: (item) => ArrayCollection.deleteItem(items, item),
  }),
};

export {ArrayCollection};
