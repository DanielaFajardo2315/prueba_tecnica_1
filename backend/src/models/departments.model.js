import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    departmentCode: {
        type: Number,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    },
    companyArea: {
        type: String,
        required: true
    },
    departmentManager: {
        type: String,
        required: true
    }
});

export const departmentModel = mongoose.model("departments", departmentSchema);