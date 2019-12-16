/* eslint-disable no-console */

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class NavBar {
  constructor(router, auth) {
    this.authenticated = false;
    this.router = router;
    this.auth = auth;
    this.loginError = '';
    this.email = '';
    this.password = '';
  }

  attached() {
    $('.navbar-nav a').on('click', function() {
      $('.navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });
  }

  login() {
    return this.auth.login(this.email, this.password)
      .then(response => {
        this.employeeObj = response.employee;
        sessionStorage.setItem('employeeObj', JSON.stringify(this.employeeObj));
        this.loginError = '';
        this.authenticated = this.auth.isAuthenticated();
        this.router.navigate('home');
      })
      .catch(error => {
        console.log(error);
        this.authenticated = false;
        this.loginError = 'Invalid credentials.';
      });
  }


  logout() {
    this.auth.logout();
    sessionStorage.removeItem('employeeObj');
    this.authenticated = this.auth.isAuthenticated();
  }
  bind() {
    this.authenticated = this.auth.isAuthenticated();
  }

  registerEmployee() {
    this.router.navigate('employees');
  }
}
