const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = required('path');

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

//app.get('/', (req,res) => res.send('Hello World'));
//app.get('/', (req,res) => res.json({msg: 'Welcome to the contact keeper api'}));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Serve static assets in production. Serve React in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))); //important to put this after the defined routes
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));