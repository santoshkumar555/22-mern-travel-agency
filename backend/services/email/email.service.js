import { sendEmail } from "./mail.service.js";
import {
    welcomeEmailTemplate,
    bookingConfirmationTemplate,
    paymentSuccessTemplate,
    bookingCancelledTemplate,
    registerOtpTemplate,
    passwordResetOtpTemplate,
    emailVerificationOtpTemplate
} from "./emailTemplates.helper.js";

export const sendWelcomeEmail = async ({ to, name }) => {
    const { subject, message } = welcomeEmailTemplate({ name });
    await sendEmail({ to, subject, text: message });
};

export const sendBookingConfirmationEmail = async ({ to, ...data }) => {
    const { subject, message } = bookingConfirmationTemplate(data);
    await sendEmail({ to, subject, text: message });
};

export const sendPaymentSuccessEmail = async ({ to, ...data }) => {
    const { subject, message } = paymentSuccessTemplate(data);
    await sendEmail({ to, subject, text: message });
};

export const sendBookingCancelledEmail = async ({ to, ...data }) => {
    const { subject, message } = bookingCancelledTemplate(data);
    await sendEmail({ to, subject, text: message });
};

export const sendRegisterOtpEmail = async ({ to, otp }) => {
    const { subject, message } = registerOtpTemplate({ otp });
    await sendEmail({ to, subject, text: message });
};

export const sendPasswordResetOtpEmail = async ({ to, otp }) => {
    const { subject, message } = passwordResetOtpTemplate({ otp });
    await sendEmail({ to, subject, text: message });
};

export const sendEmailVerificationOtpEmail = async ({ to, otp }) => {
    const { subject, message } = emailVerificationOtpTemplate({ otp });
    await sendEmail({ to, subject, text: message });
};