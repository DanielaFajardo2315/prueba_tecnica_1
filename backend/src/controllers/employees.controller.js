import { employeeModel } from "../models/employees.model.js";

// Metodo POST
export const postEmployee = async (request, response) => {
    try {
        const newEmployee = {
            ...request.body,
        }
        await employeeModel.create(newEmployee);
        return response.status(201).json({
            "mensaje": "Empleado creado correctamente"
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al crear el empleado, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}

// Metodo GET
export const getAllEmployees = async (request, response) => {
    try {
        const allEmplyees = await employeeModel.find();
        return response.status(200).json({
            "mensaje": `Se encontraron ${allEmplyees.length} empleados.`,
            "data": allEmplyees
        });
    } catch (error) {
        return response.status(500).json({
            "mensaje": "No se lograron obtener los empleados registrados, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}

// Metodo PUT
export const putEmployee = async (request, response) => {
    try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await employeeModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return response.status(200).json({
            "mensaje": "Empleado actualizado correctamente."
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al actualizar el empleado, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}

// Metodo DELETE
export const deleteEmployeeById = async (request, response) => {
    try {
        const idForDelete = request.params.id;

        await employeeModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "mensaje": "Empleado eliminado exitosamente."
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "No se pudo eliminar el empleado, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}