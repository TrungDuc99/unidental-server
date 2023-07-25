export default {
  // generals
  string: { type: String, default: '' },
  requiredString: { type: String, required: true },
  number: { type: Number },
  requireNumber: { type: Number, required: true },
  date: { type: Date },
  date_now: { type: Date, default: Date.now() },
  boolean: { type: Boolean, default: true },
  booleanFalse: { type: Boolean, default: false },
  //   book
  bookReviews: {
    type: [{ content: { type: String }, reviewer: { type: String } }],
  },
  email: { type: String, required: false },
  password: { type: String, required: false },
}
