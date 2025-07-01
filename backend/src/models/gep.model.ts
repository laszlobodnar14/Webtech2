import {model, Schema} from 'mongoose';

export interface Gep{
  id: string;
  name: string;
  marka: string;
  tipus: string;
  teljesitmeny: number;
  suly: number;
  berletidij: number;
  letet: number;
}

export const GepSchema = new Schema<Gep>(
  {
    name: {type: String, required: true},
    marka: {type: String, required: true},
    tipus: {type: String, required: true},
    teljesitmeny: {type: Number, required: true},
    suly: {type: Number, required: true},
    berletidij: {type: Number, required: true},
    letet: {type: Number, required: true},
  },{
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    timestamps: true

  }
);

export const GepModel = model<Gep>('Gep', GepSchema);
