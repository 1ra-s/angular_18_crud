export class EmployeModel {
  empId: number;
  name: string;
  city: string;
  state: string;
  emailId: string;
  contactNo: string;
  address: string;
  pinCode: string;

  constructor() {
    this.empId = 1;
    this.address = '';
    this.city = '';
    this.contactNo = '';
    this.emailId = '';
    this.name = '';
    this.state = '';
    this.pinCode = '';
  }
}
