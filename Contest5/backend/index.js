const express = require('express');
const {z, safeParse} = require('zod')
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

let bookingId = 1001

const SignUpSchema = z.object({
    username : z.string(),
    password : z.string().min(4).max(20),
    email : z.email()
})

const SignInSchema = z.object({
    username : z.string(),
    password : z.string().min(4).max(20)
})

const bookingSchema = z.object({
    movieId : z.number(),
    showId : z.number(),
    seats : z.number()
})

const updateBookingSchema = z.object({
    seats : z.number()
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

app.get('/movies',(req,res) => {
    res.json({
      success:true,
      data: constdb.movies.map(n => n.title)
    })
})

app.get('/movies/:movieid',(req,res) => {
    const movieid = parseInt(req.params.movieid)
    const valid = constdb.movies.find(n => n.id === movieid)
    if(!valid){
        res.status(404).json({
            success:false,
            message: "Movie not found"
        })
        return
    }
    res.json({
        success:true,
        data: valid.title
    })
})

app.post('/bookings/:userid',(req,res) => {
    const valid = bookingSchema.safeParse(req.body)
    if(!valid.success){
        res.status(401).json({
            success : false,
            message : "Invalid Input"
        })
        return
    }

    const {movieId,showId,seats} = req.body
    const userId = parseInt(req.params.userid)
    
    const validUser = users.find(n => n.id === userId)
    if(!validUser){
        res.status(404).json({
            success: false,
            message: "User Not Found"
        })
        return
    }

    const validMovie = constdb.movies.find(n => n.id === parseInt(movieId))
    if(!validMovie){
        res.status(404).json({
            success: false,
            message : "Movie Not Found"
        })
        return
    }

    const validShow = validMovie.shows.find(n => n.showId === parseInt(showId))
    if(!validShow){
        res.status(404).json({
            success: false,
            message: "Show Not Found"
        })
        return
    }

    const validSeats = validShow.availableSeats >= parseInt(seats)
    if(!validSeats){
        res.status(404).json({
            success : false,
            message: "Lesser seats available than requested"
        })
        return
    }

    validShow.availableSeats -= seats
    const totalamount = seats * validShow.pricePerSeat
    let date = new Date()
    date = date.toLocaleDateString()

    validUser.bookings.push(
        {
            bookingId:bookingId++,
            movieId:movieId,
            showId:showId,
            seats:seats,
            totalAmount:totalamount,
            status:"confirmed",
            bookingDate:date
        }
    )
    res.status(201).json({
        success : true,
        message : "Booking Successful",
        bookingId : bookingId,
        movieTitle : validMovie.title,
        showTime : validShow.time,
        seats : seats,
        totalAmount : totalamount
    })

})

app.get('/bookings/:userid',(req,res) => {
    const userId = parseInt(req.params.userid)
    const valid = users.find(n => n.id === userId)
    if(!valid){
        res.status(404).json({
            success: false,
            message : "User Not Found"
        })
        return
    }

    res.json({
        success: true,
        data: valid.bookings
    })
})

app.get('/bookings/:userId/:bookingId',(req,res) => {
    const userId = parseInt(req.params.userId)
    const bookingId = parseInt(req.params.bookingId)

    const validUser = users.find(n => n.id === userId)
    if(!validUser){
        res.status(404).json({
            success: false,
            message : "User Not Found"
        })
        return
    }

    const validBooking = validUser.bookings.find(n => n.bookingId === bookingId)
    if(!validBooking){
        res.status(404).json({
            success: false,
            message : "Booking Not Found"
        })
        return
    }

    res.json({
        success: true,
        data: validBooking
    })

})

app.put('/bookings/:userId/:bookingId',(req,res) => {

    const valid = updateBookingSchema.safeParse(req.body)
    if(!valid.success){
        res.status(401).json({
            success : false,
            message : "Invalid Input"
        })
        return
    }

    const userId = parseInt(req.params.userId)
    const bookingId = parseInt(req.params.bookingId)

    const validUser = users.find(n => n.id === userId)
    if(!validUser){
        res.status(404).json({
            success: false,
            message : "User Not Found"
        })
        return
    }

    const validBooking = validUser.bookings.find(n => n.bookingId === bookingId)
    if(!validBooking){
        res.status(404).json({
            success: false,
            message : "Booking Not Found"
        })
        return
    }

    if(!(validBooking.status === "confirmed")){
        res.json({
            success: false,
            message: "Cancelled Booking Update Not Possible"
        })
        return
    }

    const seats = parseInt(req.body.seats)
    const addSeats = seats - validBooking.seats
    const movieId = validBooking.movieId
    const showId = validBooking.showId
    const validMovie = constdb.movies.find(n => n.id === movieId)
    const validShow = validMovie.shows.find(n => n.showId === showId)
    const availableSeats = validShow.availableSeats
    if(addSeats > availableSeats){
      res.json({
          success : false,
          message : "Requested Additional Seats Unavailable"
      })
      return
    }
    validShow.availableSeats -= addSeats
    const totalAmount = seats * validShow.pricePerSeat
    validBooking.seats = seats
    validBooking.totalAmount = totalAmount

    res.json({
    success : true,
    message : "Booking Updated Successfully",
    bookingId : bookingId,
    seats : seats,
    totalAmount: totalAmount
    })

})

app.delete('/bookings/:userId/:bookingId',(req,res) => {
    const userId = parseInt(req.params.userId)
    const bookingId = parseInt(req.params.bookingId)

    const validUser = users.find(n => n.id === userId)
    if(!validUser){
        res.status(404).json({
            success: false,
            message : "User Not Found"
        })
        return
    }

    const validBooking = validUser.bookings.find(n => n.bookingId === bookingId)
    if(!validBooking){
        res.status(404).json({
            success: false,
            message : "Booking Not Found"
        })
        return
    }

    if(!(validBooking.status === "confirmed")){
        res.json({
            success: false,
            message: "Cannot Cancel Booking thats not confirmed"
        })
        return
    }

    validBooking.status = "cancelled"
    const movieId = validBooking.movieId
    const showId = validBooking.showId
    const update = constdb.movies.find(n => n.id === movieId).shows.find(n => n.showId === showId)
    update.availableSeats += validBooking.seats
    res.json({
        success : true,
        message : "Booking Cancelled Successfully"
    })
    
})

app.get('/summary/:userId',(req,res) => {
    const userId = parseInt(req.params.userId)
    const validUser = users.find(n => n.id === userId)
    if(!validUser){
        res.json({
            success: false,
            message: "User Not Found"
        })
        return
    }

    const confirmedBookings = validUser.bookings.filter(n => n.status === "confirmed")
    let totalAmountSpent = 0
    let totalSeatsBooked = 0

    for( x of confirmedBookings){
        totalAmountSpent += x.totalAmount
        totalSeatsBooked += x.seats
    }

    res.json({
        userId: userId,
        username: validUser.username,
        totalBookings: validUser.bookings.length,
        totalAmountSpent: totalAmountSpent,
        confirmedBookings: confirmedBookings.length,
        cancelledBookings: validUser.bookings.length - confirmedBookings.length,
        totalSeatsBooked: totalSeatsBooked
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})