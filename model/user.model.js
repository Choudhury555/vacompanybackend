import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    aadhaar: {
        type: String,
        required: true,
        unique: true
    },
    pan: {
        type: String,
        required: true,
        unique: true
    },
    bank: {
        type: String,
        required: true,
    },
    ifsc: {
        type: String,
        required: true,
    },
    aadhaarphoto: {
        type: String,
        required: true,
    },
    panphoto: {
        type: String,
        required: true,
    },
    bankphoto: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isNew && !this.employeeId) {
        const count = await mongoose.models.User.countDocuments();
        this.employeeId = `EMP-${count + 1}`;
    }
    next();
});

export const User = mongoose.model('User', userSchema);