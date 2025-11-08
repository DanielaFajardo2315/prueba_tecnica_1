import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../interfaces/department';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  // Metodos
  postDepartment(departmentToCreate: Department){
    return this._httpClient.post(this.apiUrl + '/departamentos/', departmentToCreate);
  };

  getDepartments(){
    return this._httpClient.get(this.apiUrl + '/departamentos/');
  };

  putDepartment(departmentToUpdate: Department, id: string){
    return this._httpClient.put(this.apiUrl + '/departamentos/' + id, departmentToUpdate);
  };
  
  deleteDepartment(id: string){
    return this._httpClient.delete(this.apiUrl + '/departamentos/' + id);
  };
}
