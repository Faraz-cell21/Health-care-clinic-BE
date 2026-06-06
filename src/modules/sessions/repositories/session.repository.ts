import { Session } from '../models/session.model';

export class SessionRepository {
  async create(
    data: Record<string, unknown>,
  ) {
    return Session.create(data);
  }

  async findByRefreshToken(
    refreshToken: string,
  ) {
    return Session.findOne({
      refreshToken,
    });
  }

  async deleteById(
    sessionId: string,
  ) {
    return Session.findByIdAndDelete(
      sessionId,
    );
  }

  async deleteByUserId(
    userId: string,
  ) {
    return Session.deleteMany({
      user: userId,
    });
  }

  async updateLastUsed(
    sessionId: string,
  ) {
    return Session.findByIdAndUpdate(
      sessionId,
      {
        lastUsedAt:
          new Date(),
      },
      {
        new: true,
      },
    );
  }
}