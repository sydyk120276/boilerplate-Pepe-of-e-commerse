import mongoose from 'mongoose'

const Basket = new mongoose.Schema({
  id: { type: Number, primaryKey: true, autoIncrement: true }
})

export default mongoose.model('basket', Basket)
