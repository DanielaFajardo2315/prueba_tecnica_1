import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  // Metodos
  postEmployee(employeeToCreate: Employee){
    return this._httpClient.post(this.apiUrl + '/empleados/', employeeToCreate);
  };

  getAllEmployees(){
    return this._httpClient.get(this.apiUrl + '/empleados/');
  };

  putEmployee(employeeToUpdate: Employee, id: string){
    return this._httpClient.put(this.apiUrl + '/empleados/' + id, employeeToUpdate);
  };

  deleteEmployee(id: string){
    return this._httpClient.delete(this.apiUrl + '/empleados/' + id);
  };
}
