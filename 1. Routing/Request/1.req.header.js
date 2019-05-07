const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(JSON.stringify(req.headers, null, 3));
  res.json({
    headers: req.headers,
    userAgent: req.get('user-agent')
  });
});

app.listen(9999, () => console.log('Web Server running on port 9999'));

//OUTPUT :
// {
//     "headers": {
//         "user-agent": "PostmanRuntime/7.11.0",
//         "accept": "*/*",
//         "cache-control": "no-cache",
//         "postman-token": "08c0b3b1-0663-49df-a45d-b32749acfbe3",
//         "host": "localhost:9999",
//         "accept-encoding": "gzip, deflate",
//         "connection": "keep-alive"
//     },
//     "userAgent": "PostmanRuntime/7.11.0"
// }

// {
//   "headers": {
//     "host": "localhost:9999",
//     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//     "accept-language": "en-US,en;q=0.5",
//     "accept-encoding": "gzip, deflate",
//     "connection": "keep-alive",
//     "cookie": "_ga=GA1.1.1797838580.1557074751",
//     "upgrade-insecure-requests": "1"
//   },
//   "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"
// }

/* Notes JSON Stringify :
1. Client request contain all kinds of headers that tell the server useful information about the request. 

2. Request headers depend on the method of the request such as GET, and POST. 

3. A POST request header for example will contain a content-type header to tell the server the type of content that it is being given in the body of the request. 

4. A GET request would not contain such a header, because it is just simply requesting whatever there is at a given location. 
*/
