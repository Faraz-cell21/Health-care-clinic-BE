import { AppError } from '../../../common/errors/app-error';

import { SessionRepository } from '../../sessions/repositories/session.repository';
import { UserRepository } from '../../users/repositories/user.repository';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';

export class AuthService {
  private readonly userRepository =
    new UserRepository();

  private readonly sessionRepository =
    new SessionRepository();

  async login(
    email: string,
    password: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const user =
      await this.userRepository.findByEmail(
        email,
      );

    if (!user) {
      throw new AppError(
        'Invalid credentials',
        401,
      );
    }

    const isPasswordValid =
      await user.comparePassword(
        password,
      );

    if (!isPasswordValid) {
      throw new AppError(
        'Invalid credentials',
        401,
      );
    }

    const accessToken =
      generateAccessToken({
        userId:
          user._id.toString(),
        email:
          user.email,
      });

    const refreshToken =
      generateRefreshToken({
        userId:
          user._id.toString(),
        email:
          user.email,
      });

    await this.sessionRepository.create(
      {
        user: user._id,

        refreshToken,

        ipAddress,

        userAgent,

        expiresAt: new Date(
          Date.now() +
            1000 *
              60 *
              60 *
              24 *
              30,
        ),
      },
    );

    await this.userRepository.updateLastLogin(
      user._id.toString(),
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refreshToken(
    refreshToken: string,
  ) {
    const payload =
      verifyRefreshToken(
        refreshToken,
      );

    const session =
      await this.sessionRepository.findByRefreshToken(
        refreshToken,
      );

    if (!session) {
      throw new AppError(
        'Invalid session',
        401,
      );
    }

    return {
      accessToken:
        generateAccessToken(
          payload,
        ),
    };
  }

  async logout(
    refreshToken: string,
  ) {
    const session =
      await this.sessionRepository.findByRefreshToken(
        refreshToken,
      );

    if (!session) {
      return;
    }

    await this.sessionRepository.deleteById(
      session.id,
    );
  }

  async logoutAll(
    userId: string,
  ) {
    await this.sessionRepository.deleteByUserId(
      userId,
    );
  }
}