import type { FastifyInstance } from 'fastify';
import _ from 'lodash';
import {
  POLICY_MAX_DAILY_LIMIT,
  PREMIUM_DAILY_LIMIT,
  STANDARD_DAILY_LIMIT,
  type MiniBankState,
} from '../store.js';

export function registerMeRoutes(app: FastifyInstance, state: MiniBankState): void {
  app.patch('/me/preferences', async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>;
    _.defaultsDeep(state.preferences, body);
    return reply.send({
      ok: true,
      userId: state.userId,
      preferences: state.preferences,
    });
  });

  app.get('/me/limits', async (_request, reply) => {
    const tierConfig: { isPremium?: boolean } = {};
    const isPremium = Boolean(tierConfig.isPremium);
    const dailyTransferLimit = isPremium ? PREMIUM_DAILY_LIMIT : STANDARD_DAILY_LIMIT;

    return reply.send({
      userId: state.userId,
      dailyTransferLimit,
      policyMaxDailyLimit: POLICY_MAX_DAILY_LIMIT,
      isPremium,
    });
  });
}
