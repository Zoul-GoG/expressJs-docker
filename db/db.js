const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/db-test" {
//     useNewUrlParser : true,
//     useCreateIndex : true,
//     useFindAndModify : false,
//     useUnifiedTopology: true
// });

mongoose.connect("mongodb://localhost/test-api",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connecté à la bdd !')
}).catch((err) => {
    console.log(err)
})