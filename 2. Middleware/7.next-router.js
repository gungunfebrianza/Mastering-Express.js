// Writing Router-level Middleware functions
const express = require('express');
const app = express();

//Define a new router:
const router = express.Router();

//Define our logger middleware function inside the router
router.use((request, response, next) => {
  // If id is exist then its contain number
  // the result of '!5' is 'false'
  // because of false then its satisfied (true that this is false)
  /*     
    a = 5;
    !a;
    Result :
    false; 
    */
  if (!request.query.id) {
    next('router'); // Next, out of Router
  } else {
    next(); // Next, in Router
    // If id is not exist then its undefined
    // the result of '!undefined' is 'true'
    // because of true then its going to else
    /*     
    a = undefined;
    !a;
    true; 
    */
  }
});

router.get('/', (request, response, next) => {
  //http://localhost:9999/?id=gun
  const id = request.query.id;
  console.log('go to router');
  response.send(`You specified a user ID => ${id}`);
});

app.get('/', router, (request, response, next) => {
  console.log('go to route');
  response.status(400).send('A user ID needs to be specified');
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
