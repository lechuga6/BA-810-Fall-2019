export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'World of Widgets!';
    config.map([
      {
        route: ['', 'widgets'],
        name: 'widgets',
        moduleId: 'modules/widgets',
        title: 'Widgets',
        auth: false
      }
    ]);
  }
}
