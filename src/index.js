const express = require('express'); 
const app = express();
const morgan = require('morgan'); 

//  middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());


//  starting the server 
app.listen(3000, () => {
    console.log(`Server on port ${3000}`);
}); 

