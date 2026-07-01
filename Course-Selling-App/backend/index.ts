import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../backend/prisma"
import bcrypt from "bcrypt"
import { SignUpSchema, SignInSchema, CourseAddSchema, ContentAddSchema, CourseUpdateSchema } from "./types";

const app = express()
app.use(express.json())

app.post('/user/signup',async (req,res) => {
    try{
        const valid = SignUpSchema.safeParse(req.body)
        if (!valid.success){
            res.status(404).json({
                message: "Invalid Input"
            })
            return
        }

        const { username, email, name, password } = valid.data
        const userexists = await prisma.user.findFirst({
            where:{
                username: username,
            }
        })
        if(userexists){
            res.status(403).json({
                message: "Username Already Exists"
            })
            return
        }

        const hashPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data: {
            username: username,
            password: hashPassword,
            name: name,
            email:email
            }
        })

        res.json({
            id: user.id
        })

    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }

})

app.post('/user/signin', async (req,res) => {
    try{
        const valid = SignInSchema.safeParse(req.body)
        if (!valid.success){
            res.status(404).json({
                message: "Invalid Input"
            })
            return
        }

        const { username, password } = valid.data
        const userexists = await prisma.user.findFirst({
            where:{
                username: username,
            }
        })
        if(!userexists){
            res.status(403).json({
                message: "User Not Found"
            })
            return
        }

        const validpassword = await bcrypt.compare(password,userexists.password);
        if(!validpassword){
            res.status(400).json({
                message:"Incorrect Password"
            })
            return
        }

        const token = await jwt.sign({ userId: userexists.id },`${process.env.JWT_SECRET}`)
        
        res.status(200).json({
            message: "Signed in Successfully",
            token: token
        })

    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }

})

app.post('/user/enroll', async (req,res) => {
    try{
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { userId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { userId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const courseid = parseInt(req.body.courseid)
        const validcourse = await prisma.course.findFirst({
            where:{
                id: courseid
            }
        })
        if(!validcourse){
            res.status(400).json({
                message: "Invalid Course"
            })
            return
        }

        const new_enroll= await prisma.enrollments.create({
            data:{
                courseId:courseid,
                userId: userId
            }
        })

        res.status(200).json({
            id: new_enroll.id
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.get('/user/courses', async (req,res) => {
    try{
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { userId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { userId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const courses = await prisma.course.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                image: true
            }
        })

        res.status(200).json({
            message: "Query Successful",
            data: courses
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }

})

app.get('/user/course/content/:courseid', async (req,res)=> {
    try{
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { userId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { userId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const courseId = parseInt(req.params.courseid)
        const validcourse = await prisma.course.findFirst({
            where:{
                id: courseId
            }
        })
        if(!validcourse){
            res.status(400).json({
                message: "Invalid Course"
            })
            return
        }

        const validcontent = await prisma.content.findMany({
            where:{
                courseId:courseId
            }
        })

        if(!validcontent){
            res.status(404).json({
                message: "No content Available",
            })
            return
        }

        res.status(200).json({
            message: "Query Successful",
            data : validcontent
        })

    }
    catch(err)
    {
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.post('admin/signin', async (req,res) => {
    try{
        const valid = SignInSchema.safeParse(req.body)
        if (!valid.success){
            res.status(404).json({
                message: "Invalid Input"
            })
            return
        }

        const { username, password } = valid.data
        const adminexists = await prisma.admin.findFirst({
            where:{
                username: username,
                password: password
            }
        })
        if(!adminexists){
            res.status(403).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = await jwt.sign({ adminId: adminexists.id },`${process.env.JWT_SECRET}`)
        
        res.status(200).json({
            message: "Signed in Successfully",
            token: token
        })
    }
    catch(err)
    {
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.post('/admin/course', async (req,res) => {
    try{
        const valid = CourseAddSchema.safeParse(req.body)
        if(!valid.success){
            res.status(400).json({
                message: "Invalid Input"
            })
            return
        }
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { adminId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { adminId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:adminId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const {name, description, image} = valid.data
        const new_course = await prisma.course.create({
            data:{
                name: name,
                description: description,
                image: image
            }
        })

        res.status(201).json({
            message: "Course Created",
            id: new_course.id
        })

    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.post('/admin/content', async (req,res) => {
        
    try{
        const valid = ContentAddSchema.safeParse(req.body)
        if(!valid.success){
            res.status(400).json({
                message: "Invalid Input"
            })
            return
        }

        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { adminId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { adminId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:adminId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }


        const {courseid, videourl, title} = valid.data
        const validcourse = await prisma.course.findFirst({
            where:{
                id:courseid
            }
        })

        if(!validcourse){
            res.status(404).json({
                message: "Course ID Invalid"
            })
            return
        }

        const content_new = await prisma.content.create({
            data:{
                courseId:courseid,
                videoUrl: videourl,
                title: title
            }
        })

        res.status(201).json({
            message: "Content Added",
            id: content_new.id
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.put('/admin/course', async (req,res) => {
    try{
        const valid = CourseUpdateSchema.safeParse(req.body)
        if(!valid.success){
            res.status(400).json({
                message: "Invalid Input"
            })
            return
        }
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { adminId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { adminId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:adminId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const {courseid, name, description, image} = valid.data
        const updatedCourse = await prisma.course.update({
            where:{
                id: courseid
            },
            data:{
                name:name,
                description: description,
                image:image
            }
        })
        res.status(200).json({
            message: "Update Done"
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.get('/admin/enrollments', async (req,res) => {
    try{
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { adminId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { adminId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:adminId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const count = await prisma.enrollments.count()
        const enroll = await prisma.enrollments.findMany({
            select:{
                id:true,
                userId:true,
                courseId:true
            }
        })
        
        res.status(200).json({
            count: count,
            data: enroll
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.get('/admin/courses', async (req,res) => {
    try{
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({
                message: "No token provided" 
            });
            return
        }
        const { adminId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as { adminId: number }
        
        const validid = await prisma.user.findFirst({
            where:{
                id:adminId
            }
        })
        if(!validid){
            res.status(400).json({
                message: "Invalid Token"
            })
            return
        }

        const courses = await prisma.course.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                image: true
            }
        })

        res.status(200).json({
            message: "Query Successful",
            data: courses
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Error"
        })
    }
})

app.listen(3000)