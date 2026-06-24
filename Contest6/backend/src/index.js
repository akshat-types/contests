const express = require('express');
const {router: authroutes} = require('./routes/authroutes')
const app = express();
const port = 3000;
app.use(express.json());


app.get('/',(req,res) => {
    res.send("Hello World");
});

app.use("/auth",authroutes);
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});