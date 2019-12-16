import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { Employee } from '../resources/data/employee-object';

@inject(Router, Employee)
export class Employees {
  constructor(router, employees ) {
    this.router = router;
    this.employees = employees;
    this.message = 'Employees';
  }

  newEmployee() {
    this.employee = {
      fname: '',
      lname: '',
      active: true,
      role: 'employee',
      email: '',
      password: ''
    };
  }

  async save() {
    if (this.employee && this.employee.fname && this.employee.lname
            && this.employee.email && this.employee.password) {
      await this.employees.saveEmployees(this.employee);
    }
  }
  logout() {
    this.router.navigate('home');
  }
}
