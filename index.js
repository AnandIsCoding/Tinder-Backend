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

app.get('/', (req, res) => {
        res.send('Home page');
})

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        // can create validateUserSignupData(req) by creating a new function instead of validation via schema level

        // encrypt password using bycrypt
        
        await user.save(); // Save the user and validate the schema
        res.status(201).send('Data successfully stored in the database');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).send(`Validation error: ${messages.join(', ')}`);
        } else {
            // Handle other errors (e.g., database connection issues)
            res.status(500).send('An error occurred. Please try again later.');
        }
        console.log('Error:', error);
    }
});


app.get('/user', async(req, res)=>{
    const userEmail = req.body.email;
    try{
        const allUser = await User.find({email : userEmail})
        if(allUser.length === 0){
            res.status(404).send('User not found');
        }else{
            res.send(allUser)
        }        
    }catch(error){
        console.log(error)
        res.status(404).send('Error')
    }
})

app.get('/feed', async(req, res) =>{

    try{
        const allUsers = await User.find({});
        res.send(allUsers)
    }catch(error){
        res.status(404).send('No usrs found');
        console.log(error)
    }
})

//app.delete

app.delete('/delete/:_id', async(req, res) =>{
    const userId = req.params?._id;
    const userAvailable = await User.findById(userId)
    if(!userAvailable){
        res.status(404).send('User not found');
        return;  //To prevent further execution if user not found.
    }    
    try{
        await User.deleteOne({_id : userId})
        res.send('User deleted successfully');

    }catch(error){
        console.log(error)
        res.status(500).send('Try later')
    }
})

//update
app.patch('/user/:_id', async (req, res) => {
    const userId = req.params?._id;
    const dataToBeUpdated = req.body;

    try {
        // Check if the user exists
        const UserAvailable = await User.findById(userId);
        if (UserAvailable.length === 0) {
            return res.status(404).send('User Not Found');
        }
        // Update the user data
        await User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true, runValidators:true});
        return res.status(200).send('Updated successfully');
    } catch (error) {
        if(error.name === 'ValidationError'){
           return res.status(400).send('Validation Error, enter correct values');
        }
        return res.status(500).send('Try sometime later');
    }
});










app.get('*', (req,res) =>{
    res.send('404 not found error page')
})

