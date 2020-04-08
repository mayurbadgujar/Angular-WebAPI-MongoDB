import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl}from '@angular/forms';
import { EmpserviceService } from '../empservice.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {
message:string;
dataSaved=false;
Addemployee:FormGroup;
EmployeeIdUpdate="0";

  constructor(private router:Router,private empservice:EmpserviceService) { }

  InsertEmployee(employee:Employee)
  {
    console.log(employee);
    if(this.EmployeeIdUpdate !="0")
    employee.Id=this.EmployeeIdUpdate;
    this.empservice.InsertEmployee(employee).subscribe(()=>
    {
      if(this.EmployeeIdUpdate=="0")
      {
        this.message="Saved Successfully!";    
      }
      else
      {
        this.message="Updated Successfully!";
      }
      this.dataSaved = true;
      this.router.navigate(['/employee']);
    })
  }

  onFormSubmit(){
    const emp=this.Addemployee.value;
    this.InsertEmployee(emp);
  }

  EmployeeEdit(id:string){
    console.log(id);
    this.empservice.GetEmployeeById(id).subscribe(emp=>{
      this.message=null;
      this.dataSaved=false;
      this.EmployeeIdUpdate=id;
      this.Addemployee.controls['Name'].setValue(emp.Name);
      this.Addemployee.controls["Address"].setValue(emp.Address);
      this.Addemployee.controls['Department'].setValue(emp.Department);
      this.Addemployee.controls['Country'].setValue(emp.Country);
      this.Addemployee.controls['City'].setValue(emp.City);
    });
  }

  clearForm(){
    this.Addemployee.controls['Name'].setValue('');
    this.Addemployee.controls["Address"].setValue('');
    this.Addemployee.controls['Department'].setValue('');
    this.Addemployee.controls['Country'].setValue('');
    this.Addemployee.controls['City'].setValue("");
  }

  ngOnInit() {
    this.Addemployee =new FormGroup({
      Name:new FormControl(),
      Address:new FormControl(),
      Country:new FormControl(),
      Department:new FormControl(),
      City:new FormControl(),
    });
    let Id=localStorage.getItem('id');
    if(Id!=null)
      {
        this.EmployeeEdit(Id);
      }
  }

}
