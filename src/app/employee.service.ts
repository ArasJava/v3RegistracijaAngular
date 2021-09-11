import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import {Doctor} from "./doctor";
import {WeekTable} from "./weekTable";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private apiServerUrl = environment.apiBaseUrl;
  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(`${this.baseURL}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/employee/delete/${employeeId}`);
  }


// Doctor servisai
  public getDoctors(): Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.baseURL}/doctor/all`);
  }

  public getDoctorById(doctorId: number): Observable<Doctor>{
    return this.httpClient.get<Doctor>(`${this.baseURL}/doctor/find/${doctorId}`);
  }

  public addDoctor(doctor: Doctor): Observable<Doctor>{
    return this.httpClient.post<Doctor>(`${this.baseURL}/doctor/add`, doctor);
  }

  public updateDoctor(doctor: Doctor): Observable<Doctor>{
    return this.httpClient.put<Doctor>(`${this.baseURL}/doctor/update`, doctor);
  }

  public deleteDoctor(doctorId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/doctor/delete/${doctorId}`);
  }

// WeekTable servisai
  public getWeekTables(): Observable<WeekTable[]>{
    return this.httpClient.get<WeekTable[]>(`${this.baseURL}/weekTable/all`);
  }

  public getWeekTableById(weekTableId: number): Observable<WeekTable>{
    return this.httpClient.get<WeekTable>(`${this.baseURL}/weekTable/find/${weekTableId}`);
  }

  public addWeekTable(weekTable: WeekTable): Observable<WeekTable>{
    return this.httpClient.post<WeekTable>(`${this.baseURL}/weekTable/add`, weekTable);
  }

  public updateWeekTable(weekTable: WeekTable): Observable<WeekTable>{
    return this.httpClient.put<WeekTable>(`${this.baseURL}/weekTable/update`, weekTable);
  }

  public deleteWeekTable(weekTableId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/weekTable/delete/${weekTableId}`);
  }



}
