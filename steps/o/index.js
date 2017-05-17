import {Server} from 'backend/server';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(Server, EventAggregator)
export class Notes {
  constructor(server, ea) {
    this.server = server;
    this.ea = ea;
    this.filter = 'none';
    this.noteList = [];

    this.updatedSubscription = this.ea.subscribe('note:updated', note => this.noteUpdated(note));
    this.editingSubscription = this.ea.subscribe('note:editing', note => this.noteEditing(note));
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

  noteUpdated(note) {
    let found = this.noteList.find(x => x.id === note.id);
    if (found) {
      Object.assign(found, note);
    } else {
      this.noteList.push(note);
    }
  }

  noteEditing(note) {
    let prev = this.noteList.find(x => x.isActive);
    let next = this.noteList.find(x => x.id === note.id);
    if (next) {
      if(prev) {
        prev.isActive = false;
      }

      next.isActive = true;
    }
  }

  detached() {
    this.updatedSubscription.dispose();
    this.editingSubscription.dispose();
  }
}
