const store = global.pasteStore || new Map();

if (!global.pasteStore) {
  global.pasteStore = store;
}

export default store;