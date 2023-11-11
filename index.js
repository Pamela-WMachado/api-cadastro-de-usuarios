require('dotenv').config(); 
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
); 
app.use(express.json());

app.get('/', (req, res) => {

    res.json({message: 'Teste de rota'})
})

//ROTAS DA API
const userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes);


const DB_USER = process.env.DB_USER
const DB_PW = process.env.DB_PW
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PW}@cluster0.4adcoc4.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
)
.then(() => {
    console.log("Conectado ao MongoDB.");
    app.listen(3000);
})
.catch((err) => console.log(err))
