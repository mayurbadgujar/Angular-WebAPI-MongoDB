import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmpserviceService } from '../empservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

private emp:Observable<Employee[]>;
message:string;
dataSaved=false;

  constructor(private router:Router,private empservice:EmpserviceService) { }
  laodEmployee()
  {    
    this.emp=this.empservice.GetEmployeeRecord();    
  }

  EmployeeEdit(id:string)
  {
    localStorage.removeItem("id");
    localStorage.setItem("id",id.toString());
    this.router.navigate(['/addemployee'],{queryParams:{Id:id}});
  }

  DeleteEmployee(id:string)
  {
    if(confirm("Are you sure to delete this employee"))
    {
      this.empservice.DeleteEmployee(id).subscribe(()=>
      {
        this.dataSaved=true;
        this.message="Deleted Successfully!";
      });      
    }
    this.laodEmployee();
  }
  
  ngOnInit() {
    localStorage.clear();
    this.laodEmployee();
  }
}
