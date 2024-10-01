import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeModel } from './model/Employe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeForm!: FormGroup;
  employeObj: EmployeModel;
  employeList: EmployeModel[] = [];

  constructor() {
    this.employeObj = new EmployeModel();
    this.createForm();

    const olddata = localStorage.getItem('EmpData');
    if (olddata) {
      this.employeList = JSON.parse(olddata);
    }
  }

  createForm() {
    this.employeForm = new FormGroup({
      empId: new FormControl(this.employeObj.empId || 0),
      name: new FormControl(this.employeObj.name || ''),
      city: new FormControl(this.employeObj.city || ''),
      address: new FormControl(this.employeObj.address || ''),
      contactNo: new FormControl(this.employeObj.contactNo || ''),
      pinCode: new FormControl(this.employeObj.pinCode || ''),
      state: new FormControl(this.employeObj.state || ''),
      emailId: new FormControl(this.employeObj.emailId || '')
    });
  }

  onSave() {
    const maxId = this.employeList.length > 0 ? Math.max(...this.employeList.map(emp => emp.empId)) : 0;
    this.employeForm.controls['empId'].setValue(maxId + 1);
    this.employeList.unshift(this.employeForm.value);
    localStorage.setItem('EmpData', JSON.stringify(this.employeList));
    this.employeForm.reset();
  }

  onEdit(item: EmployeModel) {
    this.employeObj = item;
    this.employeForm.patchValue({
      empId: item.empId,
      name: item.name,
      city: item.city,
      address: item.address,
      contactNo: item.contactNo,
      pinCode: item.pinCode,
      state: item.state,
      emailId: item.emailId
    });
  }

  onUpdate() {
    const record = this.employeList.find(emp => emp.empId === this.employeForm.controls['empId'].value);
    if (record) {
      record.name = this.employeForm.controls['name'].value;
      record.city = this.employeForm.controls['city'].value;
      record.address = this.employeForm.controls['address'].value;
      record.contactNo = this.employeForm.controls['contactNo'].value;
      record.pinCode = this.employeForm.controls['pinCode'].value;
      record.state = this.employeForm.controls['state'].value;
      record.emailId = this.employeForm.controls['emailId'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeList));
    this.employeForm.reset();
    this.employeObj = new EmployeModel();
  }



  trackByFn(index: number, item: EmployeModel): number {
    return item.empId;
  }


  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      const index = this.employeList.findIndex(m => m.empId === id);
      if (index !== -1) {
        this.employeList.splice(index, 1);
        localStorage.setItem('EmpData', JSON.stringify(this.employeList));
      }
    }
}

}
