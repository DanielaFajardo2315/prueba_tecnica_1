import { Component, inject } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employees';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: res.mensaje,
          icon: 'success',
          draggable: true,
        });
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      },
    });
  }

  // Cargar la info actual del empleado para editar
  loadEmployeeForEdit(employee: Employee): void {
    this.selectedEmployeeForEdit = employee;

    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(employee.entryDate, 'yyyy-MM-dd');

    this.createForm.patchValue({
      name: employee.name,
      lastName1: employee.lastName1,
      lastName2: employee.lastName2,
      entryDate: formattedDate as any,
      cargo: employee.cargo,
      isDirect: employee.isDirect,
      departmentCode: employee.departmentCode,
    });
  }

  // Edición del empleado
  updateEmployee(): void {
    if (this.createForm.invalid || !this.selectedEmployeeForEdit) {
      this.createForm.markAllAsTouched();
      return;
    }

    const employeeCodeToUpdate = this.selectedEmployeeForEdit.employeeCode;
    const idToUpdate = this.selectedEmployeeForEdit._id;
    console.log('ID del empleado a editar: ', idToUpdate);

    if (!idToUpdate) {
      console.error('No se pudo obtener el ID del empleado seleccionado para la actualización.');
      return;
    }

    // Construcción de datos de empleado con el código existente
    const employeeData: Employee = {
      _id: idToUpdate,
      employeeCode: employeeCodeToUpdate,
      name: this.createForm.value.name || '',
      lastName1: this.createForm.value.lastName1 || '',
      lastName2: this.createForm.value.lastName2 || '',
      entryDate: this.createForm.value.entryDate
        ? new Date(this.createForm.value.entryDate)
        : new Date(),
      cargo: this.createForm.value.cargo || '',
      isDirect: this.createForm.value.isDirect ?? true,
      departmentCode: this.createForm.value.departmentCode || 100,
    };

    console.log('Datos del empleado a actualizar: ', employeeData);
    Swal.fire({
      title: '¿Desea guardar los cambios del empleado?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeService.putEmployee(employeeData, idToUpdate).subscribe({
          next: (res: any) => {
            console.log(res);
            this.showEmployees();
            this.createForm.reset();
            this.selectedEmployeeForEdit = undefined;
            Swal.fire(res.mensaje, '', 'success');
          },
          error: (err: any) => {
            console.error(err.error.mensaje);
          },
        });
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info');
      }
    });
  }

  // Eliminar empleado
  deleteEmployee(employee: Employee) {
    const idForDelete = employee._id;
    if (!idForDelete) {
      console.error('No se pudo obtener el ID del empleado seleccionado para la eliminación.');
      return;
    }
    Swal.fire({
      title: '¿Está seguro de eliminar este empleado?',
      text: "No podrá restaurarlo luego",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-secundary)',
      cancelButtonColor: 'var(--color-button)',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeService.deleteEmployee(idForDelete).subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Eliminado',
              text: resp.mensaje,
              icon: 'success',
            }).then(() => {
              this.showEmployees();
            });
          },
          error: (err: any) => {
            console.error(err.error.mensaje);
            
          }
        });

      }
    });
  }
}
