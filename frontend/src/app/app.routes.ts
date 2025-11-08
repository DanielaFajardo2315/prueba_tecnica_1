import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Employees } from './pages/employees/employees';
import { Departments } from './pages/departments/departments';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Home, title: 'Inicio'},
    { path: 'empleados', component: Employees, title: 'Empleados'},
    { path: 'departamentos', component: Departments, title: 'Departamentos'},
    { path: '**', component: NotFound, title: '404'},
];
