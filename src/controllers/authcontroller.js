import signup from '../../database/app/signup.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // use true for 465
    auth: {
        user: "960068001@smtp-brevo.com",
        pass: "JngyWdBPKNAsH1mE", // generated from Brevo
    },
})

export const signupController = async (req, res) => {
    try {
        const user = await signup(req.body);
        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Verification link
        const link = `${process.env.FRONTEND_URL}/api/verify-email?token=${token}`;

        // Send email
        try {
            const info = await transporter.sendMail({
                from: 'svp107995@gmail.com',
                to: user.email,
                subject: "Welcome to Finance Tracker",
                html: `<p>Hello Welcome to the Finance Tracker! Thanks for signing up.</p><h3>Click the link below to verify your email:</h3><a href=${link}>${link}</a>`,
            });

            console.log("Email sent:", info.messageId);
        } catch (error) {
            console.error("Error sending email:", error);
        }
        res.status(201).json({ message: "Signup successful! Please check your email to verify.", user, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message, success: false });
    }
}