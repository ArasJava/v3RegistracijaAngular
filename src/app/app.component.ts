import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private destroy$ = new Subject();
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
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
    if (mode === 'workTime'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#workTimeModal');
    }

    if (mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
