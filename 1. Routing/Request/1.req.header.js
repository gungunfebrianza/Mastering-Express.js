const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(JSON.stringify(req.headers, null, 2));
  res.json({
    headers: req.headers,
    userAgent: req.get('user-agent')
  });
});

app.listen(9999, () => console.log('Web Server running on port 9999'));

/* Notes :
1. Client request contain all kinds of headers that tell the server useful information about the request. 

2. Request headers depend on the method of the request such as GET, and POST. 

3. A POST request header for example will contain a content-type header to tell the server the type of content that it is being given in the body of the request. 

4. A GET request would not contain such a header, because it is just simply requesting whatever there is at a given location. 
*/
