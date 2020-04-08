import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {HttpHeaders , HttpClient} from '@angular/common/http';
import {Employee} from '../app/employee';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {
Url="https://localhost:44367/Api/Emp";
  constructor(private http:HttpClient) { }

  InsertEmployee(employee:Employee)
  {
    const httpOptions ={headers:new HttpHeaders({'content-Type':'application/json'})};
    return  this.http.post<Employee[]>(this.Url+'/AddEmployee',employee,httpOptions)
  }

  GetEmployeeRecord():Observable<Employee[]>
  {    
    return this.http.get<Employee[]>(this.Url+'/GetAllEmployee')
  }

  DeleteEmployee(id:string):Observable<number>
  {
    debugger;
    return this.http.get<number>(this.Url+'/Delete/?id='+id);
  }

  GetEmployeeById(id:string)
  {
    debugger;
    return this.http.get<Employee>(this.Url+'/GetEmployeeById/?id='+id);
  }

  UpdateEmployee(employee:Employee)
  {
    const httpOptions={headers:new HttpHeaders({'Conyent-Type':'application/json'})};
    return this.http.post<Employee[]>(this.Url+'/AddEmployee',employee,httpOptions)
  }
}
