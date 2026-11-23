import Fastify, { type FastifyInstance } from 'fastify';
import { registerMeRoutes } from './routes/me.js';
import { registerStatementRoutes } from './routes/statements.js';
import { createSeedState } from './store.js';

export function buildApp(): FastifyInstance {
  // Fixture only, intentionally vulnerable: simulates a legacy, permissively configured service.
  const app = Fastify({ logger: false, onProtoPoisoning: 'ignore', onConstructorPoisoning: 'ignore' });
  const state = createSeedState();

  app.get('/health', async () => {
    return { status: 'ok', service: 'minibank-mobile' };
  });

  registerMeRoutes(app, state);
  registerStatementRoutes(app, state);

  return app;
}
