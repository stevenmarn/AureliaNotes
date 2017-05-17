import {Server} from 'backend/server';
import {Router, Redirect} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {inject} from 'aurelia-framework';

@inject(Server, Router, EventAggregator, CommonDialogs)
export class Detail {
  constructor(server, router, ea, commonDialogs) {
    this.server = server;
    this.router = router;
    this.ea = ea;
    this.commonDialogs = commonDialogs;
  }

  canActivate(params) {
    return this.server.getNotebookList()
      .then(notebooks => this.notebooks = notebooks)
      .then(() => {
        if (!params.noteId) {
          return this.server.newNote();
        } else {
          return this.server.getNote(params.noteId);
        }
      }).then(note => {
        if(note) {
          this.edit(note);
        } else {
          return new Redirect('');
        }
      });
  }

  activate() {
    if (this.note.id) {
      this.ea.publish('note:editing', this.note);
    }
  }

  canDeactivate() {
    if(this.original && this.server.hasChanged(this.note, this.original)) {
      let message = 'You have made changes to your note. Are you sure you wish to navigate away?';
      
      return this.commonDialogs
        .showMessage(message, 'Unsaved Changes', ['Yes', 'No'])
        .then(result => !result.wasCancelled);
    }

    return true;
  }

  edit(note) {
    this.note = note;
    this.original = JSON.parse(JSON.stringify(note));
  }

  save() {
    let isNew = !this.note.id;
    this.server.saveNote(this.note).then(note => {
      this.ea.publish('note:updated', note);
      this.edit(note);

      if(isNew) {
        this.router.navigateToRoute('edit', { noteId: note.id }, { replace: true, trigger: true });
      }
    });
  }
}
