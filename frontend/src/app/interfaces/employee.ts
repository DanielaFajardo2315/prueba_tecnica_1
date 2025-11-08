export interface Employee {
    _id?: string;
    employeeCode: number;
    name: string;
    lastName1: string;
    lastName?: string;
    entryDate: Date;
    cargo: string;
    isDirect: boolean;
    departmentCode: number;
}
