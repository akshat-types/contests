const express = require('express');
const {z} = require('zod')
const app = express();
const port = 3000;
app.use(express.json());

constdb = {
  users: [],
  movies: [
    {
      id:1,
      title:"Inception",
      genre:"Sci-Fi",
      duration:148,
      shows: [
        {
          showId:101,
          time:"10:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:102,
          time:"2:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:103,
          time:"6:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:2,
      title:"The Dark Knight",
      genre:"Action",
      duration:152,
      shows: [
        {
          showId:201,
          time:"11:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:202,
          time:"3:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:203,
          time:"7:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:3,
      title:"Interstellar",
      genre:"Sci-Fi",
      duration:169,
      shows: [
        {
          showId:301,
          time:"12:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:302,
          time:"5:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    }
  ]
}

users = [{
id:1,
username:"rahul_gujjar",
password:"pass123",
email:"rahul@example.com",
token:null,
bookings: [
    {
      bookingId:1001,
      movieId:1,
      showId:102,
      seats:3,
      totalAmount:750,
      status:"confirmed",
      bookingDate:"2026-06-18"
    }
  ]
}]

const SignUpSchema = z.object({
    username : z.string(),
    password : z.string().min(4).max(20),
    email : z.email()
})

const SignInSchema = z.object({
    username : z.string(),
    password : z.string().min(4).max(20)
})

app.post('/signup',(req,res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const result = SignUpSchema.safeParse(req.body)
    if(!result.success){
        res.status(401).json({
            success: false,
            message: "Invalid Input",
            username: ""
        })
        return
    }
    not_valid = users.find(n => n.username === username)
    if(not_valid){
        res.status(401).json({
            success: false,
            message: "User Exists",
            username: username
        })
        return
    }
    const newId = users.length + 1
    users.push({
        id: newId,
        username:username,
        password:password,
        email:email,
        token:"",
        bookings: []
    })
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        userId: newId
    })
    
})

app.post('/signin',(req,res) => {
    const result = SignInSchema.safeParse(req.body)
    if(!result.success){
        res.status(401).json({
            success: false,
            message: "Invalid Input",
            username: ""
        })
        return
    }
    const {username, password} = result.data
    valid = users.find(n => n.username === username && n.password === password)
    if(!valid){
        res.status(401).json({
            success: false,
            message: "Invalid Credentials",
            username: ""
        })
        return
    }
    const token=Math.random().toString()
    valid.token = token
    res.status(200).json({
        success: true,
        message: "Sign In Successful",
        token: token
    })
    
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})