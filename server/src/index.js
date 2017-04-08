import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import session from 'express-session'
import mongoDB from './utils/mongoDB'
import passport from 'passport'
import mainRoute from './routes/mainRoute'
import authRoute from './routes/authRoute'
import validateRoute from './routes/validateRoute'

const app = express()
const PORT = 3001

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoute)
app.use(validateRoute)
app.use(mainRoute)

app.listen(PORT, () => {
    console.log(`Up and running on port : ${ PORT }`)
})