const express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send('home');
});

/*Definition
This property is an object containing properties mapped to the named route “parameters”.
For example, if you have the route /user/:name, then the “name” property is available as req.params.name.
This object defaults to {}.
*/
app.get('/post/:id/category/:category_id', (req, res) => {
  res.send(`
    <p>Here is ${req.params.id}</p>
    <p>category is ${req.params.category_id}</p>
    `);
});

/* Visit: 
localhost:9999/post/2/category/3; 
*/

/* Output :
<p>Here is 2</p>
<p>category is 3</p> */

app.listen(9999);
console.log('server listening!');
