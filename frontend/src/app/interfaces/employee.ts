export interface Employee {
    _id?: string;
    employeeCode: number;
    name: string;
    lastName1: string;
    lastName2?: string;
    entryDate: Date | undefined;
    cargo: string;
    isDirect: boolean;
    departmentCode: number;
}
