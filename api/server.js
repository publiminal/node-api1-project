// BUILD YOUR SERVER HERE
const express = require('express') // TODO :: update to ESM import
const db = require('./users/model')


const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    console.log('I received a request!');
    res.send("<h1>Hello world!</h1><p>Here is a paragraph</p>");
});

/* 
User Schema
Each User resource should conform to the following structure (AKA schema):

{
  id: "a_unique_id", // String, required
  name: "Jane Doe",  // String, required
  bio: "Having fun", // String, required
}

*/
/* 
    POST
    /api/users	
    Creates a user using the information sent inside the request body.
    Validate new user Object is properlt sent against schema . 
    TODO : validate empy values sent ?
*/
server.post('/api/users', ( req, res ) =>{
    const newUser = req.body
    const isValid = 'name' in newUser && 'bio' in newUser // check for both properties available
    const unCompleteMessage = { message: "Please provide name and bio for the user" } 
    const errMessage = {message:'There was an error while saving the user to the database'}
    if(isValid){
        db.insert(newUser)
        .then( result => res.status(201).json(result).end() )
        .catch( result => res.status(500).json(errMessage).end() )
    }else{
        res.status(400).json(unCompleteMessage).end()
    }  
})

/* 
    GET	
    /api/users	
    Returns an array users, cero if no resultsnpm run test
*/
server.get('/api/users', (req, res) => {
    const errMessage = {message:'The users information could not be retrieved'}
    db.find()
    .then(result => res.status(200).json(result).end())
    .catch(result => res.status(500).json(errMessage).end())
})


module.exports = server  /* {
    server, db
}; // EXPORT YOUR SERVER instead of {}
 */