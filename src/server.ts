import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import * as routes from './routes'

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

routes.global(app)

app.listen(port, () => {
  console.log(`Lighthouse Local application is running on port ${port}.`)
})
