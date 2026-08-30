const Password_Rules = [
    { regex: /.{8,}/, label: "at least 8 characters" },
    { regex: /[a-z]/, label: "one lowercase letter" },
    { regex: /[A-Z]/, label: "one uppercase letter" },
    { regex: /\d/, label: "one digit" },
    { regex: /[\W_]/, label: "one special character" },
];

export const validatePassword = (password, envVarName = "USER_SEED_PASSWORD") => {
    const failed = Password_Rules.filter((r) => !r.regex.test(password));
    if (failed.length) {
        throw new Error(
            `Password ("${password}") does not meet the requirements: ` +
            failed.map((r) => r.label).join(", ") + ".\n" +
            `Update ${envVarName} in your .env file.`
        );
    }
};
