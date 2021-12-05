import mongoose from 'mongoose';
import validator from 'validator';
const { toJSON } = require('./plugins/toJSON');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(toJSON);

export default mongoose.model('users', userSchema);
