import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import {Doctor} from "./doctor";
import { EmployeeService } from './employee.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {DoctorService} from "./doctor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public employees?: Employee[] | undefined;
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;

  public doctor: Doctor[] ;
  public docId: number;
  public doctors?: Doctor[] | undefined;
  public editDoctor?: Doctor;
  public deleteDoctor?: Doctor;

  private destroy$ = new Subject();
  constructor(private employeeService: EmployeeService) { }


  ngOnInit() {
    this.getEmployees();
    this.getDoctors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      (response: Employee) => {
        console.log(response);
       // this.getEmployees();
        this.employees = [...this.employees, response]
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }


  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
      (response: Employee) => {
        console.log(response);
       // this.getEmployees();
      this.employees = this.employees.map((empl)=> empl.id === response.id ? response : empl)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    console.log(employeeId)
    this.employeeService.deleteEmployee(employeeId)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      (response: void) => {
        console.log(response);
      //  this.getEmployees();
     this.employees = this.employees.filter((employee)=> employee.id !== employeeId)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.birthday.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'addDoctor'){
      button.setAttribute('data-target', '#addDoctorModal');
    }
    if (mode === 'workTime'){
      // this.editEmployee = employee;
      button.setAttribute('data-target', '#workTimeModal');
    }
    if (mode === 'edit'){
      this.editEmployee = employee;
      // this.editDoctor = doctor;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
  // DOCTOR
  public onAddDoctor(addForm: NgForm): void {
    document.getElementById('add-doc-form')?.click();
    this.employeeService.addDoctor(addForm.value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: Doctor) => {
          console.log(response);
          // this.getDoctor();
          this.doctors = [...this.doctors, response]
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      )
  }
  public getDoctors(): void {
    this.employeeService.getDoctors()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: Doctor[]) => {
          this.doctors = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
  }

  public onUpdateDoctor(doctor: Doctor): void {
    this.employeeService.updateDoctor(doctor)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: Doctor) => {
          console.log(response);
          // this.getEmployees();
          this.doctors = this.doctors.map((doc)=> doc.id === response.id ? response : doc)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onGetDoctorById(doctorID: number): void {
    this.employeeService.getDoctorById(doctorID)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: Doctor) => {
          console.log(response);
          this.doctors = this.doctors.filter((doc)=> doc.id === response.id ? response : doc)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  onChangeSelect(doctor_id : number):void{
    console.log(doctor_id);
  }

}
