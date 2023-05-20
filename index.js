// Importer express
const express = require('express')

// Importer Mongoose
const mongoose = require('mongoose')

// Importer CORS
const cors = require('cors')

// Importer body-parser
const bodyParser = require('body-parser')

// Importer body-parser
const userRoute = require('./router/usersRoute')

//  graphQL Routes handler
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schemas/index')
require('./db/db');

// const schema = mongoose.schema
// const ObjectId = schema.ObjectId

//      Les tables


// const Post = new Schema({
//     title : String,
//     content : Text,
//     user_id : ObjectId,
//     created_at : Date,
//     updated_at : Date,
// });




// Nouvelle instance d'express
const app = express()

// Définir un port
const PORT = 5000



//      Ajout d'éléments à l'app
app.use(cors())

//  Utilisation de JSON
app.use(bodyParser.json())

// Utilisation des routes
app.use('/api/users', userRoute)

// graphQL UI : Route pour accéder à l'interface
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );
  
//      Connexion à la bdd
// mongoose.connect("mongodb://localhost/test-api",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connecté à la bdd !')
// }).catch((err) => {
//     console.log(err)
// })




app.listen(PORT, () => {
    console.log(`Votre appli est lancée sur  http://localhost:${PORT}`)
})

app.get('/', (req, res)=>{
    res.send("Hello World ! How ?")
})

app.get('/', (req, res)=>{
    res.send("Hello World ! How ?")
})