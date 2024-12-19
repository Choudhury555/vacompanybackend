import { User } from "../model/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const aadhaarphoto = req.files?.aadhaarphoto?.[0];
        const panphoto = req.files?.panphoto?.[0];
        const bankphoto = req.files?.bankphoto?.[0];
        // console.log(aadhaarphoto);
        const { firstname, lastname, phone, email, aadhaar, pan, bank, ifsc} = req.body;
        // console.log(firstname, lastname, phone, email, aadhaar, pan, bank, ifsc, aadhaarphoto?.path, panphoto?.path, bankphoto?.path);

        const aadhaarResponse = await cloudinary.uploader.upload(aadhaarphoto?.path);
        const panResponse = await cloudinary.uploader.upload(panphoto?.path);
        const bankResponse = await cloudinary.uploader.upload(bankphoto?.path);

        if (!firstname || !lastname || !phone || !email || !aadhaar || !pan || !bank || !ifsc || !aadhaarphoto || !panphoto || !bankphoto) {
            return res.status(400).json({
                message: "Please Give all the details",
                success: false
            })
        }

        if (phone.length !== 10) {
            return res.status(400).json({
                message: "Please give Phone number carefully. Phone Number should be 10 digits.",
                success: false
            })
        }

        if (aadhaar.length !== 12) {
            return res.status(400).json({
                message: "Please give Aadhaar carefully. Aadhaar number should be 12 digits.",
                success: false
            })
        }

        if (pan.length !== 10) {
            return res.status(400).json({
                message: "Please give PAN number carefully.",
                success: false
            })
        }

        const user = await User.findOne({ aadhaar });
        if (user) {
            // Update existing employee data
            user.firstname = firstname;
            user.lastname = lastname;
            user.phone = phone;
            user.email = email;
            user.pan = pan;
            user.bank = bank;
            user.ifsc = ifsc;
            user.aadhaarphoto = aadhaarResponse?.secure_url;
            user.panphoto = panResponse?.secure_url;
            user.bankphoto = bankResponse?.secure_url;

            await user.save();

            return res.status(200).json({
                message: "Existing employee updated successfully.",
                success: true,
            });
        }

        const findEmail = await User.findOne({ email });
        if (findEmail) {
            return res.status(400).json({
                message: "Your Email Already Exist. Give a new One",
                success: false
            })
        }
        const findPan = await User.findOne({ pan });
        if (findPan) {
            return res.status(400).json({
                message: "Your Pan Already Exist. You are already worked in this company",
                success: false
            })
        }

        await User.create({
            firstname, lastname, phone, email, aadhaar, pan, bank, ifsc, aadhaarphoto:aadhaarResponse?.secure_url, panphoto:panResponse?.secure_url, bankphoto:bankResponse?.secure_url
        });

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getAllUser = async (req, res) => {
    try {
        const alluser = await User.find();

        return res.status(200).json({
            mesage: "Here all user Registered",
            alluser,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}