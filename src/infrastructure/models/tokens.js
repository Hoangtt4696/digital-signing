import mongoose from 'mongoose';
import { toJSON } from './plugins/toJSON';
import config from 'ds-config';

const {
  TOKEN_TYPES: { ACCESS, REFRESH },
} = config.jwt;

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
    type: {
      type: String,
      enum: [ACCESS, REFRESH],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

tokenSchema.plugin(toJSON);

export default mongoose.model('Token', tokenSchema);
