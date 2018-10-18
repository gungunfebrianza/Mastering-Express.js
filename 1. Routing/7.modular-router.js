const express = require('express')
const app = express()

//Define a router
const miniapp = express.Router()

miniapp.get('/home', (request, response, next) => {
	const url = request.originalUrl
	response
		.status(200)
		.send(`You are visiting /home from ${url}`)
})

app.use('/api', miniapp)
app.use('/about', miniapp)

app.listen(
	9999,
	() => console.log('Web Server running on port 9999'),
)

// http://localhost:9999/api/home
// http://localhost:9999/about/home
