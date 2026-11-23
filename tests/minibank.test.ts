import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('minibank-mobile baseline', () => {
  it('returns healthy status from GET /health', async () => {
    const app = buildApp();
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'ok', service: 'minibank-mobile' });
    await app.close();
  });

  it('enforces baseline daily transfer limit within policy ceiling', async () => {
    const app = buildApp();
    const res = await app.inject({ method: 'GET', url: '/me/limits' });
    expect(res.statusCode).toBe(200);
    const body = res.json<{
      userId: string;
      dailyTransferLimit: number;
      policyMaxDailyLimit: number;
      isPremium: boolean;
    }>();
    expect(body.isPremium).toBe(false);
    expect(body.dailyTransferLimit).toBeLessThanOrEqual(body.policyMaxDailyLimit);
    await app.close();
  });

  it('applies default user preferences via PATCH /me/preferences', async () => {
    const app = buildApp();
    const res = await app.inject({
      method: 'PATCH',
      url: '/me/preferences',
      payload: { theme: 'dark', notifications: { email: true } },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json<{
      ok: boolean;
      preferences: {
        theme?: string;
        language: string;
        notifications: { sms: boolean; push: boolean; email?: boolean };
      };
    }>();
    expect(body.ok).toBe(true);
    expect(body.preferences.theme).toBe('dark');
    expect(body.preferences.language).toBe('vi');
    expect(body.preferences.notifications.sms).toBe(true);
    expect(body.preferences.notifications.push).toBe(true);
    expect(body.preferences.notifications.email).toBe(true);
    await app.close();
  });

  it('returns projected statements without internalAuditCode via GET /statements', async () => {
    const app = buildApp();
    const res = await app.inject({ method: 'GET', url: '/statements' });
    expect(res.statusCode).toBe(200);
    const body = res.json<{
      userId: string;
      items: Array<Record<string, unknown>>;
    }>();
    expect(body.items.length).toBeGreaterThan(0);
    for (const item of body.items) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('note');
      expect(item).not.toHaveProperty('internalAuditCode');
    }
    await app.close();
  });
});
