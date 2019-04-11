const Collection = {
  getAllItems: collection => [...collection],
  addItem: (collection, item) => [...collection, item],
  updateItem: (collection, item) => collection.map(i => i.id === item.id ? item : i),
  deleteItem: (collection, item) => collection.reduce((newCollection, i) => [...newCollection, ...(i.id === item.id ? [] : [i])], [])
};
export default Collection;
