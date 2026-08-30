const getName = (name) =>
    name?.trim() || "Traveler";

const formatCurrency = (amount) =>
    `₹${(amount ?? 0).toLocaleString("en-IN")}`;

const buildWelcomeMessage = (name) => `\
Hi ${getName(name)},

Welcome to Travel Agency! We're thrilled to have you on board.

You can now browse our travel packages, make bookings, and manage \
your trips — all in one place.

Here's what you can do next:
    • Explore Packages : https://yoursite.com/packages
    • Complete Your Profile : https://yoursite.com/profile
    • Contact Support : support@yoursite.com

If you have any questions, we're always here to help.

Happy travels,
The Travel Agency Team

──────────────────────────────────────────
You received this email because you registered at Travel Agency.
If this wasn't you, please contact support@yoursite.com immediately.`;

export const welcomeEmailTemplate = ({ name } = {}) => ({
    subject: `Welcome to Travel Agency, ${getName(name)}! 🌍 Let's plan your next adventure`,
    message: buildWelcomeMessage(name),
});


const buildBookingConfirmationMessage = ({
    name,
    bookingId,
    packageTitle,
    travelDate,
    numberOfPeople,
    totalPrice,
}) => `\
Hi ${getName(name)},

Great news — your booking is confirmed! 🎉

──────────────────────────────────────────
    Booking ID   : ${bookingId ?? "-"}
    Package      : ${packageTitle ?? "-"}
    Travel Date  : ${travelDate ?? "-"}
    Travelers    : ${numberOfPeople ?? "-"}
    Total Amount : ${formatCurrency(totalPrice)}
──────────────────────────────────────────

You can view your full booking details here:
    https://yoursite.com/bookings/${bookingId ?? ""}

Need to make changes or have questions?
    • Manage Booking : https://yoursite.com/bookings/${bookingId ?? ""}
    • Contact Support : support@yoursite.com

We look forward to making your trip unforgettable!

Warm regards,
The Travel Agency Team`;

export const bookingConfirmationTemplate = (data = {}) => ({
    subject: `Booking Confirmed – ${data.packageTitle ?? "Your Trip"} (#${data.bookingId ?? "-"})`,
    message: buildBookingConfirmationMessage(data),
});


const buildPaymentSuccessMessage = ({
    name,
    bookingId,
    packageTitle,
    totalPrice,
}) => `\
Hi ${getName(name)},

Your payment has been received successfully. ✅

──────────────────────────────────────────
    Booking ID   : ${bookingId ?? "-"}
    Package      : ${packageTitle ?? "-"}
    Amount Paid  : ${formatCurrency(totalPrice)}
──────────────────────────────────────────

Your invoice is available here:
    https://yoursite.com/bookings/${bookingId ?? ""}/invoice

If you did not authorise this payment or need assistance:
    • Contact Support : support@yoursite.com

Thank you for choosing Travel Agency. We can't wait to take you there!

Warm regards,
The Travel Agency Team`;

export const paymentSuccessTemplate = (data = {}) => ({
    subject: `Payment Received for Booking #${data.bookingId ?? "-"} ✅`,
    message: buildPaymentSuccessMessage(data),
});


const buildBookingCancelledMessage = ({
    name,
    bookingId,
    packageTitle,
    travelDate,
    totalPrice,
}) => `\
Hi ${getName(name)},

We're sorry to let you know that your booking has been cancelled.

──────────────────────────────────────────
    Booking ID   : ${bookingId ?? "-"}
    Package      : ${packageTitle ?? "-"}
    Travel Date  : ${travelDate ?? "-"}
    Amount       : ${formatCurrency(totalPrice)}
──────────────────────────────────────────

Refund Information:
    If you're eligible for a refund, it will be processed within 5–7 business days to your original payment method.

Ready to plan a new trip?
    • Explore Packages : https://yoursite.com/packages

If you have questions about this cancellation or your refund:
    • Contact Support : support@yoursite.com

We hope to welcome you back soon.

Warm regards,
The Travel Agency Team`;

export const bookingCancelledTemplate = (data = {}) => ({
    subject: `Your Booking #${data.bookingId ?? "-"} Has Been Cancelled`,
    message: buildBookingCancelledMessage(data),
});


const buildOtpMessage = ({ otp }) => `\
Hi there,

Your one-time verification code is:

    ${otp}

This code will expire in 5 minutes.

For your security:
    • Never share this code with anyone.
    • Travel Agency will never ask you for this code.
    • If you did not request this, please ignore this email.

Warm regards,
The Travel Agency Team`;

export const registerOtpTemplate = ({ otp } = {}) => ({
    subject: `${otp} is your Travel Agency verification code`,
    message: buildOtpMessage({ otp }),
});


const buildPasswordResetOtpMessage = ({ otp }) => `\
Hi there,

You requested to reset your Travel Agency password.

Your one-time verification code is:

    ${otp}

This code will expire in 5 minutes.

For your security:
    • Never share this code with anyone.
    • Travel Agency will never ask you for this code.
    • If you did not request a password reset, please ignore this 
    email — your account remains safe.

Warm regards,
The Travel Agency Team`;

export const passwordResetOtpTemplate = ({ otp } = {}) => ({
    subject: `${otp} is your Travel Agency password reset code`,
    message: buildPasswordResetOtpMessage({ otp }),
});

const buildEmailVerificationOtpMessage = ({ otp }) => `\
Hi there,

Please verify your email address to activate your Travel Agency account.

Your one-time verification code is:

    ${otp}

This code will expire in 5 minutes.

For your security:
    • Never share this code with anyone.
    • Travel Agency will never ask you for this code.
    • If you did not request this, please ignore this email.

Warm regards,
The Travel Agency Team`;

export const emailVerificationOtpTemplate = ({ otp } = {}) => ({
    subject: `${otp} is your Travel Agency email verification code`,
    message: buildEmailVerificationOtpMessage({ otp }),
});