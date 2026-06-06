import {
    Query,
    Schema,
  } from 'mongoose';
  
  export const softDeletePlugin = (
    schema: Schema,
  ): void => {
    const excludeDeleted = function (
      this: Query<unknown, unknown>,
    ) {
      this.where({
        deletedAt: null,
      });
    };
  
    schema.pre('find', excludeDeleted);
  
    schema.pre('findOne', excludeDeleted);
  
    schema.pre(
      'findOneAndUpdate',
      excludeDeleted,
    );
  
    schema.pre(
      'countDocuments',
      excludeDeleted,
    );
  };