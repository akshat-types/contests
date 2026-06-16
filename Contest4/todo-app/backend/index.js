const express = require('express');
const {z} = require('zod')
const app = express();
const port = 3000;
app.use(express.json());
let counter = 3;
const todoSchema = z.object({
    //id : z.number(), has to be automatic using counter 
    task : z.string().min(4).max(20) //,
    //completed : z.boolean() has to be false by default
})

todos = [{
  id: 1,
  task: "Learn Express",
  completed: false
},
{
    id:2,
    task: "Learn DSA",
    completed:true
}]

app.get('/todos',(req,res) => {
    res.json({
        success: true,
        data: todos
    })
})

app.post('/todos',(req,res) => {
    const result = todoSchema.safeParse(req.body)
    if(!result.success){
        res.status(401).json({
            success: false,
            data:[],
            message: "invalid input"
        })
    }
    
    const {task} = result.data
    let pushObj = {
        id : counter++,
        task,
        completed: false
    }
    todos.push(pushObj)
    res.status(201).json({
        success: false,
        data:[],
        message: "invalid input"
    })

})

app.put('/todos/:id',(req,res) => {
    const todoId = parseInt(req.params.id)
    const todo = todos.find(t => t.id === todoId)
    if(!todo){
        res.status(401).json({
        success: false,
        data:[],
        message: "invalid input"
    })
    }
    todo.completed=true;
    res.status(200).json({
        success: true,
        data : todo,
        message: "Data updated successfully"
    })
})

app.delete('/todos/:id',(req,res) => {
    const todoId = parseInt(req.params.id)
    todos=todos.filter(t => t.id != todoId)
    res.status(200).json({
        success: true,
        data : [],
        message: "Data deleted successfully"
    })
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

