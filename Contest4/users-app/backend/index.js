const express = require('express');
const {z} = require('zod')
const app = express();
const port = 3000;
app.use(express.json());

const userSignupSchema = z.object({
    email : z.email(),
    password : z.string().min(4).max(10)
})

users=[]

app.post('/users',(req,res) => {
    /*
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)
    */
    const result = userSignupSchema.safeParse(req.body)
    if(!result.success){
        res.status(401).json({
            success: false,
            data:"invalid input"
        })
    }
    const {email,password} = result.data

    res.json({
        success: true,
        data : "user login successful"
    })
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})