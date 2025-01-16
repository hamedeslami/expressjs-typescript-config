interface ValidationError {
    msg: string;
}

export const formattedErrors = (allErrors: Record<string, ValidationError>): Record<string, string>[] => {
    return Object.keys(allErrors).map((key) => ({
        [key]: allErrors[key].msg,
    }));
};