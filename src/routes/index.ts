import * as express from 'express'
export const global = (app: express.Application) => {
  app.get('/', (req: any, res) => {
    res.render('home')
  })
}
