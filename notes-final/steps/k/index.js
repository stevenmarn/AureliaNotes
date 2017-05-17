import {Server} from 'backend/server';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(Server)
export class Notes {
  constructor(server) {
    this.server = server;
    this.filter = 'none';
    this.noteList = [];
  }

  configureRouter(config, router){
    config.map([
      { route: '', moduleId: './no-selection' },
      { route: 'new', moduleId: './detail', name: 'new' },
      { route: 'edit/:noteId', name:'edit', moduleId: './detail' }
    ]);

    this.router = router;
  }

  activate(params) {
    this.filter = params.filter ? params.filter : this.filter;
    return this.server.getNoteList(this.filter).then(x => this.noteList = x);
  }
}
