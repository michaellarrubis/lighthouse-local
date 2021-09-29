import express from 'express'
import path from 'path'
import * as routes from './routes'

const app = express()
const port = 7030

app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

routes.global(app)

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`)
})
