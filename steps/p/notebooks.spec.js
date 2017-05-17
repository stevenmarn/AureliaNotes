import {NotebooksIndex} from 'notebooks/index';

describe('the notebooks index view-model', () => {
  let notes;
  let server;
  
  beforeEach(() => {
    server = jasmine.createSpyObj('server', ['getNotebookList', 'createNotebook']);
    notes = new NotebooksIndex(server);
  });
  
  it('should load the notebookList when it activates', done => {
    let serverResults = [];
    server.getNotebookList.and.returnValue(Promise.resolve(serverResults));
    
    notes.activate().then(() => {
      expect(server.getNotebookList).toHaveBeenCalled();
      expect(notes.notebookList).toEqual(serverResults);
      done();
    });
  });
  
  it('should create a notebook with the provided name and add it to the list', done => {
    notes.notebookName = 'Test';
    notes.notebookList = [];
    
    let serverResults = {};
    server.createNotebook.and.returnValue(Promise.resolve(serverResults));
    
    notes.createNotebook().then(() => {
      expect(server.createNotebook).toHaveBeenCalled();
      expect(notes.notebookList).toContain(serverResults);
      done();
    });
  });
  
  it('should not create a notebook if no name is provided', done => {
    notes.notebookList = [];
    
    notes.createNotebook().then(() => {
      expect(server.createNotebook).not.toHaveBeenCalled();
      expect(notes.notebookList.length).toEqual(0);
      done();
    });
  });
});
