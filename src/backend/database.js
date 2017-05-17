let lastId = 0;

function nextId() {
  return ++lastId;
}

let defaultNotebook = {
  id: nextId(),
  title: 'My Notes'
};

export const database = {
  nextId: nextId,
  notebooks: [
    defaultNotebook
  ],
  notes: [
    {
      id: nextId(),
      notebookId: defaultNotebook.id,
      title: 'Sample Note',
      body: 'This is a sample note. You can type details in here!'
    }
  ]
};
