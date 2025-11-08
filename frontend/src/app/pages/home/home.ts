import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employees';
import { Employee } from '../../interfaces/employee';
import { DepartmentService } from '../../services/departments';
import { Department } from '../../interfaces/department';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private _employeeService = inject(EmployeeService);
  private _departmentService = inject(DepartmentService);
  allEmployees: Employee[] = [];
  allDepartments: Department[] = [];

  // Obtener la cantidad de empleados directos
  get directEmployeesCount(): number {
    return this.allEmployees.filter(employee => employee.isDirect).length;
  }
  // Obtener la cantidad de areas
  get areasCount(): number {
    const areaNames = this.allDepartments.map(dep => dep.companyArea);
    const uniqueAreas = new Set(areaNames);
    return uniqueAreas.size;
  }

  // Obtener todos los empleados
  showEmployees(){
    this._employeeService.getAllEmployees().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.allEmployees = resp.data;
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      },
    });
  }

  // Obtener todos los departamentos
  showDepartments(){
    this._departmentService.getDepartments().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.allDepartments = resp.data;
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
        
      }
    });
  }

  ngOnInit(): void {
    this.showEmployees();
    this.showDepartments();
  }
}
