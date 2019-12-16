import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Employee {
  constructor(data) {
    this.data = data;
    this.EMPLOYEE_SERVICE = 'employees';
  }
  async saveEmployee(employee) {
    if (employee) {
      let serverResponse = await this.data.post(employee, this.EMPLOYEE_SERVICE);
      return serverResponse;
    }
  }
}
