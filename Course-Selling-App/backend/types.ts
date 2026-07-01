import z from "zod";
import { CourseScalarFieldEnum } from "./generated/prisma/internal/prismaNamespace";

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.email(),
    username: z.string(),
    password: z.string()
})

export const SignInSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const CourseAddSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string()
})

export const ContentAddSchema = z.object({
    courseid: z.number() ,
    videourl: z.string(), 
    title: z.string()
})

export const CourseUpdateSchema = z.object({
    courseid : z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string()
})