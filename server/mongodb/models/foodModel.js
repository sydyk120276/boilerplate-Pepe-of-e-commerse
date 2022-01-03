import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('products', foodSchema)
