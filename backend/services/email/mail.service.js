import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendEmail = async ({ to, subject, text, html }) => {
    await transporter.sendMail({
        from: `Travel Agency <${process.env.MAIL_USER}>`,
        to,
        subject,
        ...(html ? { html } : { text }), 
    });
};