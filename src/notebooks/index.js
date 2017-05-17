import {Server} from 'backend/server';
import {inject} from 'aurelia-framework';

@inject(Server)
export class NotebooksIndex {
  constructor(server) {
    this.server = server;
    this.notebookName = '';
  }

  activate() {
    return this.server.getNotebookList().then(x => this.notebookList = x);
  }

  createNotebook() {
    if (!this.notebookName) {
      return;
    }

    this.server.createNotebook(this.notebookName).then(notebook => {
      this.notebookName = '';
      this.notebookList.push(notebook);
    });
  }
}
