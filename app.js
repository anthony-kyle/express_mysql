const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function headers (req, res, next) {
	const origin = 'https://pilcrowmicro.com'
	res.setHeader('Access-Control-Allow-Origin', origin)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
	next()
}

app.use(headers)


const carRoutes = require('./routes/cars')

app.use('/api/v1/cars', carRoutes)

app.use((req, res, next) => {
  res.send('Sorry cannot recognize: ' + req.url)
})

app.use((err, req, res, next) => {
  res.send('ErrorHandlingMiddleWare: ' + err.message)
})

const PORT = process.env.port || 3000
app.listen(PORT, () => {
  console.log('app running @ ' + PORT)
})
