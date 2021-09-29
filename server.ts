import express from 'express'

const app = express()
const port = 7030

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`)
})
