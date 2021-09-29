import * as express from 'express'
import { auditSite } from '../helpers/audit'
import fs from 'fs'

export const global = (app: express.Application) => {
  app.get('/', (req: any, res) => {
    res.render('home')
  })

  app.post('/', async (req: any, res) => {
    const url = req.body.url
    auditSite(url)
      .then((results) => {
        if (results) {
          fs.writeFileSync('src/public/report.html', results)
          res.redirect('/report.html')
        }
      })
      .catch(() => {
        return res.redirect('/')
      })
  })

  app.get('/result', (req: any, res) => {
    res.render('result')
  })
}
