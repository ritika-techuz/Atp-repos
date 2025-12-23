export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET || 'Techuz',
    jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN) || 86400 // 1d
};
