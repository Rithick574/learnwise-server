const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  instructorId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
  },
  status: {
    type: String,
  },
  currentPeriodEnd: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);


