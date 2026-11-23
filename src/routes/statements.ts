import type { FastifyInstance } from 'fastify';
import _ from 'lodash';
import type { MiniBankState } from '../store.js';

const PUBLIC_STATEMENT_FIELDS = ['id', 'amount', 'currency', 'createdAt', 'note'] as const;

export function registerStatementRoutes(app: FastifyInstance, state: MiniBankState): void {
  app.get('/statements', async (_request, reply) => {
    const items = state.statements.map((entry) => _.pick(entry, PUBLIC_STATEMENT_FIELDS));
    return reply.send({
      userId: state.userId,
      items,
    });
  });
}
