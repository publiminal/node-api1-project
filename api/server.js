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
        .then( result => res.status(201).json(result) )
        .catch( result => res.status(500).json(errMessage) )
    }else{
        res.status(400).json(unCompleteMessage)
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
    .then(result => res.status(200).json(result))
    .catch(result => res.status(500).json(errMessage))
})

/* 
    GET	
    /api/users/:id	
    Returns the user object with the specified id. 
*/
server.get('/api/users/:id', (req, res) =>{
    const notFoundMessage = { message: "The user with the specified ID does not exist" } 
    const errMessage = {message:'The users information could not be retrieved'}
    db.findById(req.params.id)
    .then(result => {
        if( result != null ){
            res.status(200).json(result)
        }else{
            res.status(404).json(notFoundMessage)
        }
    })
    .catch(result => res.status(500).json(errMessage))
})

/* 
    DELETE
    /api/users/:id	
    Removes the user with the specified id and returns the deleted user.
*/
server.delete('/api/users/:id', (req, res) =>{
    const notFoundMessage = { message: "The user with the specified ID does not exist" } 
    const errMessage = {message:'The user could not be removed'}
    db.remove(req.params.id)
    .then(result => {
        if( result != null ){
            res.status(200).json(result)
        }else{
            res.status(404).json(notFoundMessage)
        }
    })
    .catch(result => res.status(500).json(errMessage))
})

/* 
    PUT
    /api/users/:id	
    Updates the user with the specified id using data from the request body. Returns the modified user
*/
server.put('/api/users/:id', (req, res) =>{
    const notBodyMessage = { message: "Please provide name and bio for the user" } 
    const notFoundUser = { message: "The user with the specified ID does not exist" } 
    const errMessage = {message:'The user information could not be modified'}
    const {name, bio} = req.body
    const isOkBody = name != null && bio != null 
    // console.log(`name : ${name} -- bio : ${bio} ///// isOkBody : ${isOkBody} `)
    if(isOkBody){
        db.update(req.params.id, req.body)
        .then(result => {
            if( result != null ){
                res.status(200).json(result)
            }else{
                res.status(404).json(notFoundUser)
            }
        })
        .catch(result => res.status(500).json(errMessage))
    }else{
        res.status(400).json(notBodyMessage)
    }
})



module.exports = server  /* {
    server, db
}; // EXPORT YOUR SERVER instead of {}
 */