import axios from 'axios'
// import { readFile } from 'fs/promises'

const { readFile } = require('fs').promises

export const getProductsFunc = () => {
  return readFile(`${__dirname}/../data/data.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch(() => [])
}
export const sortProductsList = (arrayOfProducts, sortType, direction) => {
  switch (sortType) {
    case 'name': {
      arrayOfProducts.sort((a, b) => {
        if (direction) {
          return b.title.localeCompare(a.title)
        }
        return a.title.localeCompare(b.title)
      })
      break
    }
    case 'price': {
      arrayOfProducts.sort((a, b) => {
        if (direction) {
          return b.price - a.price
        }
        return a.price - b.price
      })
      break
    }
    default:
      return arrayOfProducts
  }
  return arrayOfProducts
}

function rateChecker() {
  let ratesRequestDate = 0
  const msAtHour = 1000 * 60 * 60 // 1 Hour
  let currency = {}
  return {
    checkDate: (dateMs = 0) => ratesRequestDate + msAtHour <= dateMs,
    setRateDate: (dateMs = 0) => {
      ratesRequestDate = dateMs
    },
    setCurrency: (newCurrency = {}) => {
      currency = { ...newCurrency }
    },
    getRates: () => currency
  }
}

const myRates = rateChecker()

export const getRates = async () => {
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
  const mockRates = {
    CAD: 1.3,
    EUR: 0.9,
    USD: 1
  }

  const date = +new Date()

  if (myRates.checkDate(date)) {
    console.log('Wait data from exchange API...')
    await axios(url)
      .then(({ data }) => data.rates)
      .then((cur) => myRates.setCurrency(cur))
      .catch(() => mockRates)
    myRates.setRateDate(date)
  }

  return myRates.getRates()
}
