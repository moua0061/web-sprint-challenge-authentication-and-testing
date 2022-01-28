module.exports = {
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
    PORT: process.env.PORT || 3300,
    JWT_SECRET: process.env.JWT_SECRET || 'keep it hush',
}