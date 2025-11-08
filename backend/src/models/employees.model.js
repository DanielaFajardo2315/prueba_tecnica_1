import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeCode: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName1: {
        type: String,
        required: true
    },
    lastName2: {
        type: String
    },
    entryDate: {
        type: Date,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    isDirect: {
        type: Boolean,
        required: true
    },
    departmentCode: {
        type: Number
    }
});

export const employeeModel = mongoose.model("employees", employeeSchema);