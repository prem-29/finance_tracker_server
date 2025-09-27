import signup from '../../database/app/signup.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false, // use true for 465
//     auth: {
//         user: "97fb48001@smtp-brevo.com",
//         pass: "Z8H1CPbEgnI9cYm2", // generated from Brevo
//     },
// })

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const signupController = async (req, res) => {
    try {
        const user = await signup(req.body);

        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Verification link
        const link = `${process.env.FRONTEND_URL}/api/verify-email?token=${token}`;

        // Send email via Brevo API
        try {
            const response = await tranEmailApi.sendTransacEmail({
                sender: { email: "your_verified_sender@domain.com", name: "Finance Tracker" }, // must be verified in Brevo
                to: [{ email: user.email }],
                subject: "Welcome to Finance Tracker",
                htmlContent: `
          <p>Hello, welcome to the Finance Tracker! Thanks for signing up.</p>
          <h3>Click the link below to verify your email:</h3>
          <a href="${link}">${link}</a>
        `,
            });

            console.log("Email sent:", response);
        } catch (error) {
            console.error("Error sending email:", error);
        }

        res
            .status(201)
            .json({
                message: "Signup successful! Please check your email to verify.",
                success: true,
            });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error during signup", error: error.message, success: false });
    }
};