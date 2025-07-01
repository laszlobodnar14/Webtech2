import {model, Schema} from 'mongoose';
export interface User{
  id: string;
  name: string;
  ambassador: string;
  email: string;
  password: string;
  taxnum: number;
  address: string;
  isAdmin: boolean;
  balance: number;
}
export const UserSchema = new Schema<User>({

  name: {type: String, required: true},
  ambassador: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  taxnum: {type: Number, required: true},
  address: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  balance: {type: Number, required: true},
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  }
);

export const UserModel = model<User>('user', UserSchema);
