export class App {
  configureRouter(config, router){
    config.title = 'Aurelia Notes';
    config.map([
      { route: '', moduleId: 'welcome' }
    ]);

    this.router = router;
  }
}
