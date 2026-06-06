import {
    Document,
    Types,
  } from 'mongoose';
  
  export interface BaseDocument
    extends Document {
    createdAt: Date;
  
    updatedAt: Date;
  
    deletedAt: Date | null;
  
    createdBy: Types.ObjectId | null;
  
    updatedBy: Types.ObjectId | null;
  
    deletedBy: Types.ObjectId | null;
  }