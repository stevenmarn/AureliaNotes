import {database} from './database';

export class Server {
  newNote() {
    return {
      title: 'New Note',
      body: '',
      notebookId: database.notebooks[0].id
    };
  }

  hasChanged(a, b) {
    return a.title !== b.title || a.body !== b.body || a.notebookId !== b.notebookId;
  }

  getNoteList(filter) {
    let results = filter && filter !== 'none'
      ? database.notes.filter(x => x.notebookId === parseInt(filter))
      : database.notes;

    results = results.map(x => ({
      id: x.id,
      title: x.title,
      body: x.body
    }));

    return Promise.resolve(results);
  }

  getNote(id) {
    let found = database.notes.find(x => x.id == id);
    return Promise.resolve(found ? JSON.parse(JSON.stringify(found)) : null);
  }

  getNotebookList() {
    return Promise.resolve(database.notebooks.map(x => ({
      id: x.id,
      title: x.title
    })));
  }

  saveNote(note) {
    let existing;

    if(note.id) {
      existing = database.notes.find(x => x.id === note.id);
    } else {
      existing = {id: database.nextId()};
      database.notes.push(existing);
    }

    Object.assign(existing, note);
    return Promise.resolve(JSON.parse(JSON.stringify(existing)));
  }

  createNotebook(name) {
    let notebook = {
      id: database.nextId(),
      title: name
    };

    database.notebooks.push(notebook);

    return Promise.resolve(JSON.parse(JSON.stringify(notebook)));
  }
}
