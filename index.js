const express = require('express')
const app = express();
const connectToDb = require("./configs/database")
const User = require('./models/user')
app.use(express.json() )

connectToDb()
    .then(()=>{
        console.log('database connection established')
        app.listen(3000,() =>{
            console.log('Server is listening at http://localhost:3000');
        })
    })
    .catch((err) =>{
        console.log('database connection failed')
        console.log('Refresh page or wait for sometime')
    })


app.post('/signup', async(req,res) =>{
    const user = new User(req.body)
    try{
        await user.save(user)
        res.send('data successfully stored in database')
    }catch(error){
        res.send('Try sometime later');
        console.log(error);
    }
})


app.get('/', (req, res) => {
    res.send('Home page');
})





app.get('*', (req,res) =>{
    res.send('404 not found error page')
})

