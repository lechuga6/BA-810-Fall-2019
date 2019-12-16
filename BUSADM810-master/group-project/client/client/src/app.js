import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.title = 'Movies in Stock';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'modules/home',
        title: 'Home',
        auth: false
      },
      {
        route: 'employees',
        name: 'employees',
        moduleId: 'modules/employees',
        title: 'Employees',
        auth: true

      },
      {
        route: 'movies',
        name: 'movies',
        moduleId: 'modules/movies',
        title: 'Movies',
        auth: true
      }
    ]);
  }
}
