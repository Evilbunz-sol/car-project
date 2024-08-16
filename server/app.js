require('dotenv').config()
require("express-async-errors")

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_API_KEY:', process.env.SUPABASE_API_KEY);


const { swaggerUi, specs } = require('./swaggerConfig');

// express
const express = require("express")
const app = express()
const path = require('path')

// DB
const connectSupabase = require('./db/connect')

// Packages
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const mongoSanitize = require("express-mongo-sanitize")

// Route Import
const carsRouter = require("./routes/carsRoutes")
const recommendRouter = require("./routes/recommendRoutes")

// Error Handler Import
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// Routes
app.set("trust proxy", 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json())
app.use("/api/v1/cars", carsRouter)
app.use("/api/v1/recommend", recommendRouter)

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
})


// Error Handler Routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// Connect To Local & DB
const port = process.env.PORT || 3000
const start = async () => {
  try {
    const supabase = connectSupabase()
    app.locals.supabase = supabase
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
