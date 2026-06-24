const {z} = require('zod');

const SignUpSchema = z.object({
    username : z.string(),
    password : z.string()
});

const SignInSchema = z.object({
    username : z.string(),
    password : z.string()
});

module.exports = {
    SignUpSchema,
    SignInSchema
}