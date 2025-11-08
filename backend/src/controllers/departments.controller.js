import { departmentModel } from "../models/departments.model.js";

// Metodo POST
export const postDepartment = async (request, response) => {
    try {
        const newDepartment = {
            ...request.body
        }
        await departmentModel.create(newDepartment);
        return response.status(201).json({
            "mensaje": "Departamento creado existosamente."
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al crear el departamento.",
            "error": error.mensaje || error
        });
    }
}

// Metodo GET
export const getAllDepartments = async (request, response) => {
    try {
        const allDepartments = await departmentModel.find();
        return response.status(200).json({
            "mensaje": "Departamentos encontrados.",
            "data": allDepartments
        });
    } catch (error) {
        return response.status(500).json({
            "mensaje": "No se lograron obtener los departamentos, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}

// Metodo PUT
export const putDepartmentById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await departmentModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return response.status(200).json({
            "mensaje": "Departamento actualizado correctamente."
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al actualizar el departamento, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}

// Metodo DELETE
export const deleteDepartmentById = async (request, response) => {
    try {
        const idForDelete = request.params.id;

        await departmentModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "mensaje": "Departamento eliminado exitosamente."
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "No se pudo eliminar el departamento, intente de nuevo.",
            "error": error.mensaje || error
        });
    }
}