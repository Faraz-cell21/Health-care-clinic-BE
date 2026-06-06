import { Model } from 'mongoose';

export const softDeleteDocument =
  async (
    model: Model<any>,
    id: string,
    deletedBy?: string,
  ): Promise<void> => {
    await model.findByIdAndUpdate(id, {
      deletedAt: new Date(),

      deletedBy: deletedBy ?? null,
    });
  };