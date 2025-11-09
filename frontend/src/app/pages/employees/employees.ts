import { Component, inject } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employees';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  private _employeeService = inject(EmployeeService);
  private _router = inject(Router);
  allEmployees: Employee[] = [];
  selectedEmployeeForEdit?: Employee;

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName1: new FormControl('', [Validators.required]),
    lastName2: new FormControl(''),
    entryDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
    cargo: new FormControl('', [Validators.required]),
    isDirect: new FormControl<boolean>(true, [Validators.required]),
    departmentCode: new FormControl<number | null>(null, [Validators.required]),
  });

  // Obtener todos los empleados
  showEmployees() {
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

  ngOnInit(): void {
    this.showEmployees();
  }

  // Crear empleado
  createEmployee() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const employeeData: Employee = {
      employeeCode: this.allEmployees.length + 1,
      name: this.createForm.value.name || '',
      lastName1: this.createForm.value.lastName1 || '',
      lastName2: this.createForm.value.lastName2 || '',
      entryDate: this.createForm.value.entryDate || new Date(),
      cargo: this.createForm.value.cargo || '',
      isDirect: this.createForm.value.isDirect ?? true,
      departmentCode: this.createForm.value.departmentCode || 100,
    };
    console.log('Datos del usuario: ', employeeData);
    // Evitar que se repitan los codigos de empleados
    let newEmployeeCode = employeeData.employeeCode;
    while (this.allEmployees.some((employee) => employee.employeeCode === newEmployeeCode)) {
      newEmployeeCode++;
    }
    employeeData.employeeCode = newEmployeeCode;

    this._employeeService.postEmployee(employeeData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showEmployees();
        this.createForm.reset();
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      },
    });
  }

  // Editar empleado
  // updateEmployee(id: string, employeeToUpdate: Employee){
  //   if (this.createForm.invalid) {
  //     this.createForm.markAllAsTouched();
  //     return;
  //   }
  //   this.selectedEmployeeForEdit = employeeToUpdate;

  //   const employeeData: Employee = {
  //     employeeCode: this.selectedEmployeeForEdit.employeeCode,
  //     name: this.createForm.value.name || '',
  //     lastName1: this.createForm.value.lastName1 || '',
  //     lastName2: this.createForm.value.lastName2 || '',
  //     entryDate: this.createForm.value.entryDate || new Date(),
  //     cargo: this.createForm.value.cargo || '',
  //     isDirect: this.createForm.value.isDirect ?? true,
  //     departmentCode: this.createForm.value.departmentCode || 100,
  //   };
  //   console.log('Datos del usuario: ', employeeData);
  // }
  // loadEmployeeForEdit(employee: Employee): void {
  //       this.selectedEmployeeForEdit = employee;

  //       // Formatea la fecha para el input[type="date"]
  //       const datePipe = new DatePipe('en-US'); // Usa el DatePipe inyectado en imports
  //       const formattedDate = datePipe.transform(employee.entryDate, 'yyyy-MM-dd');

  //       this.createForm.patchValue({
  //           name: employee.name,
  //           lastName1: employee.lastName1,
  //           lastName2: employee.lastName2,
  //           entryDate: formattedDate, // Asegúrate de que el formato sea 'yyyy-MM-dd'
  //           cargo: employee.cargo,
  //           isDirect: employee.isDirect,
  //           departmentCode: employee.departmentCode,
  //       });
  //   }

  loadEmployeeForEdit(employee: Employee): void {
    this.selectedEmployeeForEdit = employee;

    // Formatea la fecha para el input[type="date"]
    const datePipe = new DatePipe('en-US'); // Usa el DatePipe inyectado en imports
    const formattedDate = datePipe.transform(employee.entryDate, 'dd/MM/yyyy');

    this.createForm.patchValue({
      name: employee.name,
      lastName1: employee.lastName1,
      lastName2: employee.lastName2,
      entryDate: employee.entryDate, // Asegúrate de que el formato sea 'yyyy-MM-dd'
      cargo: employee.cargo,
      isDirect: employee.isDirect,
      departmentCode: employee.departmentCode,
    });
  }

  // Función para editar el empleado
  updateEmployee(): void {
    // Asegúrate de que el formulario es válido y de que hay un empleado seleccionado
    if (this.createForm.invalid || !this.selectedEmployeeForEdit) {
      this.createForm.markAllAsTouched();
      return;
    }

    const employeeCodeToUpdate = this.selectedEmployeeForEdit.employeeCode;

    const idForService = employeeCodeToUpdate.toString();

    // Construir el objeto de datos de empleado con el código existente
    const employeeData: Employee = {
      employeeCode: employeeCodeToUpdate,
      name: this.createForm.value.name || '',
      lastName1: this.createForm.value.lastName1 || '',
      lastName2: this.createForm.value.lastName2 || '',
      // Convierte la cadena de fecha del formulario a un objeto Date si es necesario para el backend
      // Aquí simplemente usamos el valor, pero ajusta según tu interfaz/backend
      entryDate: this.createForm.value.entryDate
        ? new Date(this.createForm.value.entryDate)
        : new Date(),
      cargo: this.createForm.value.cargo || '',
      isDirect: this.createForm.value.isDirect ?? true,
      departmentCode: this.createForm.value.departmentCode || 100,
    };

    console.log('Datos del empleado a actualizar: ', employeeData);

    // Llama al servicio para actualizar el empleado
    this._employeeService.putEmployee(employeeData, idForService).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showEmployees(); // Recarga la lista
        // Opcionalmente, cierra el modal y resetea el formulario
        // Debes tener una forma de cerrar el modal de Bootstrap, por ejemplo,
        // utilizando la API de Bootstrap o una referencia a la plantilla.
        this.createForm.reset();
        this.selectedEmployeeForEdit = undefined;
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      },
    });
  }

  // Opcional: Función para manejar el cierre del modal de edición
  onEditModalClose(): void {
    this.createForm.reset();
    this.selectedEmployeeForEdit = undefined;
  }
}
