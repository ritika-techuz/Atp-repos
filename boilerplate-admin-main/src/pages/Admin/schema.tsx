import zod from 'zod';

export const changePassword = {
    schema: zod.object({
        oldPassword: zod.string().min(1, 'Current password is required'),
        newPassword: zod.string().min(8, 'Password must be at least 8 characters long'),
        confirmPassword: zod.string().min(1, 'Please confirm your password'),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match", path: ["confirmPassword"]
    }),

    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' }
}