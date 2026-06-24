const bcrypt = require('bcrypt')
const pool = require('../db')
const {SignUpSchema,SignInSchema} = require('../types/types')

async function SignUpController(req,res){
    try{
        const valid = SignUpSchema.safeParse(req.body)
        if(!valid.success){
            res.status(400).json({
                success : false,
                message : "Invalid Input"
            })
        }
        
        const {username,password} = valid.data
        console.log("SELECT * from users WHERE username='"+username+"'")
        //const validUser = await pool.query("SELECT * from users WHERE username='"+username+"'")
        const validUser = await pool.query("SELECT * from users where username = $1",[username]);
        if (validUser.rows.length !=0){
            res.status(411).json({
                success: false,
                message: "Username already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await pool.query("INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id",[username,hashPassword])
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user : newUser.rows[0]
        })
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
        return;
    }
}

function SignInController(req,res){

}

module.exports = {
    SignUpController,
    SignInController
}