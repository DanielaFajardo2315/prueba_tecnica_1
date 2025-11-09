import { Component, inject } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employees';
import { Department } from '../../interfaces/department';
import { DepartmentService } from '../../services/departments';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departments',
  imports: [ReactiveFormsModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {
  private _departmentService = inject(DepartmentService);
  private _router = inject(Router);
  allDepartments: Department[] = [];
  selectedDepartmentForEdit?: Department;

  createForm = new FormGroup({
    departmentCode: new FormControl<number | null>(null, [Validators.required]),
    departmentName: new FormControl('', [Validators.required]),
    companyArea: new FormControl('', [Validators.required]),
    departmentManager: new FormControl('', [Validators.required]),
  });

  // Obtener todos los departamentos
  showDepartments() {
    this._departmentService.getDepartments().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.allDepartments = resp.data;
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      },
    });
  }

  ngOnInit(): void {
    this.showDepartments();
  }

  // Crear departamento
  createDepartment() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const departmentData: Department = {
      departmentCode: this.allDepartments.length + 101,
      departmentName: this.createForm.value.departmentName || '',
      companyArea: this.createForm.value.companyArea || '',
      departmentManager: this.createForm.value.departmentManager || '',
    };
    console.log('Datos del departamento: ', departmentData);
    // Evitar que se repitan los codigos de los departamentos
    let newDepartmentCode = departmentData.departmentCode;
    while (this.allDepartments.some((department) => department.departmentCode === newDepartmentCode)) {
      newDepartmentCode++;
    }
    departmentData.departmentCode = newDepartmentCode;

    this._departmentService.postDepartment(departmentData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showDepartments();
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

  // Cargar la info actual del departamento para editar
  loadDepartmentForEdit(department: Department): void {
    this.selectedDepartmentForEdit = department;


    this.createForm.patchValue({
      departmentCode: department.departmentCode,
      departmentName: department.departmentName,
      companyArea: department.companyArea,
      departmentManager: department.departmentManager,
    });
  }

  // Edición del departamento
  updateDepartment(): void {
    if (this.createForm.invalid || !this.selectedDepartmentForEdit) {
      this.createForm.markAllAsTouched();
      return;
    }

    const departmentCodeToUpdate = this.selectedDepartmentForEdit.departmentCode;
    const idToUpdate = this.selectedDepartmentForEdit._id;
    console.log('ID del departamento a editar: ', idToUpdate);

    if (!idToUpdate) {
      console.error('No se pudo obtener el ID del departamento seleccionado para la actualización.');
      return;
    }

    // Construcción de datos de departamento con el código existente
    const departmentData: Department = {
      _id: idToUpdate,
      departmentCode: departmentCodeToUpdate,
      departmentName: this.createForm.value.departmentName || '',
      companyArea: this.createForm.value.companyArea || '',
      departmentManager: this.createForm.value.departmentManager || '',
    };

    console.log('Datos del departamento a actualizar: ', departmentData);
    Swal.fire({
      title: '¿Desea guardar los cambios del departamento?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._departmentService.putDepartment(departmentData, idToUpdate).subscribe({
          next: (res: any) => {
            console.log(res);
            this.showDepartments();
            this.createForm.reset();
            this.selectedDepartmentForEdit = undefined;
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

  // Eliminar departamento
  deleteDepartment(department: Department) {
    const idForDelete = department._id;
    if (!idForDelete) {
      console.error('No se pudo obtener el ID del empleado seleccionado para la eliminación.');
      return;
    }
    Swal.fire({
      title: '¿Está seguro de eliminar este departamento?',
      text: 'No podrá restaurarlo luego',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-secundary)',
      cancelButtonColor: 'var(--color-button)',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._departmentService.deleteDepartment(idForDelete).subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Eliminado',
              text: resp.mensaje,
              icon: 'success',
            }).then(() => {
              this.showDepartments();
            });
          },
          error: (err: any) => {
            console.error(err.error.mensaje);
          },
        });
      }
    });
  }
}
