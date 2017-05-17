canDeactivate() {
  if(this.original && this.server.hasChanged(this.note, this.original)) {
    let message = 'You have made changes to your note. Are you sure you wish to navigate away?';
    
    return this.commonDialogs
      .showMessage(message, 'Unsaved Changes', ['Yes', 'No'])
      .then(result => !result.wasCancelled);
  }

  return true;
}
