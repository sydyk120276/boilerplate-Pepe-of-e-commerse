import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import io from 'socket.io'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from './config'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import foodModel from './mongodb/models/foodModel'
import User from './mongodb/models/userModels'
import { getRates, sortProductsList, getProductsFunc } from './common'

import Html from '../client/html'

const { resolve } = require('path')

// const { readFile, writeFile } = require('fs').promises

// const readFiled = () => {
//   return readFile(`${__dirname}/data/data.json`, 'utf8')
// }

// const writeFiled = (rates) => {
//   writeFile(`${__dirname}/data/rate.json`, JSON.stringify(rates), 'utf8')
// }

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cors(),
  passport.initialize(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`)
]
passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.get('/api/v1/products/:currentPage', async (req, res) => {
  const { currentPage } = req.params
  const perPage = +config.PER_PAGE
  try {
    const data = await foodModel
      .find()
      .skip(perPage * currentPage - perPage)
      .limit(perPage)
    res.json({ data })
  } catch (err) {
    console.log(err)
  }
})

server.get('/api/v1/totalCount', async (req, res) => {
  try {
    const data = await foodModel.find()
    res.json(data.length)
  } catch (err) {
    console.log(err)
  }
})

// server.get('/api/v1/products', async (req, res) => {
//   const result = await getProductsFunc()
//   //  console.log(result)
//   try {
//     const data = await foodModel.create(result)
//     res.json(data)
//   } catch (err) {
//     console.log(err)
//   }
// })

// server.get('/api/v1/rates', async (req, res) => {
//   const result = await axios('https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD')
//     .then(({ data }) => {
//       writeFiled(data.rates)
//       return data.rates
//     })
//     .catch(async () => {
//       try {
//         const rate = await readFile(`${__dirname}/data/rate.json`, 'utf-8').then((text) => JSON.parse(text))
//         return rate
//       } catch (err) {
//         console.log(err)
//       }
//       return { USD: 1 }
//     })
//   res.json(result)
// })

server.get('/api/v1/rates', async (req, res) => {
  const currency = await getRates()
  res.json(currency)
})

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

server.post('/api/v1/auth', async (req, res) => {
  const { email, password, role } = req.body
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ message: 'Некорректный email или password' })
  }
  const candidate = await User.findOne({ email })
  if (candidate) {
    return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
  }
  const hashPassword = await bcrypt.hash(password, 5)
  const user = await User.create({ email, role, password: hashPassword })
  // eslint-disable-next-line
  // const basket = await Basket.create({ userId: user.id })
  const token = generateJwt(user.id, user.email, user.role)
  return res.json({ token })
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

// function sortProductsList(arrayOfProducts, sortType, direction) {
//   switch (sortType) {
//     case 'name': {
//       arrayOfProducts.sort((a, b) => {
//         if (direction) {
//           return a.title.localeCompare(b.title)
//         }
//         return b.title.localeCompare(a.title)
//       })
//       break
//     }
//     case 'price': {
//       arrayOfProducts.sort((a, b) => {
//         if (direction) {
//           return a.price - b.price
//         }
//         return b.price - a.price
//       })
//       break
//     }
//     default:
//       return arrayOfProducts
//   }
//   return arrayOfProducts
// }

server.post('/api/v1/sort', async (req, res) => {
  const { sortType, direction } = req.body
  const arrayOfProducts = await getProductsFunc()
  // const arrayOfProducts = await foodModel.find()
  const sortArrayProducts = sortProductsList(arrayOfProducts, sortType, direction)
  res.json(sortArrayProducts.slice(0, 16))
})

const logs = []

server.post('/api/v1/logs', async (req, res) => {
  logs.push(req.body)
  res.json(logs)
})

server.get('/api/v1/logs', async (req, res) => {
  res.json(logs)
})

server.get('/', (req, res) => {
  res.send('Express Server')
})

// MongoDB
if (config.mongoEnabled) {
  // eslint-disable-next-line
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
if (config.socketsEnabled) {
  // eslint-disable-next-line
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)
// eslint-disable-next-line
console.log(`Serving at http://localhost:${PORT}`)
