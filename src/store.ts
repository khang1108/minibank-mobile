export const POLICY_MAX_DAILY_LIMIT = Number(
  process.env.POLICY_MAX_DAILY_LIMIT ?? 50_000_000,
);
export const STANDARD_DAILY_LIMIT = 20_000_000;
export const PREMIUM_DAILY_LIMIT = 200_000_000;

export interface UserPreferences {
  theme?: string;
  language: string;
  notifications: {
    sms: boolean;
    push: boolean;
    email?: boolean;
  };
  [key: string]: unknown;
}

export interface StatementRecord {
  id: string;
  amount: number;
  currency: string;
  createdAt: string;
  note: string;
  internalAuditCode: string;
}

export interface MiniBankState {
  userId: string;
  balance: number;
  preferences: UserPreferences;
  statements: StatementRecord[];
}

export function createSeedState(): MiniBankState {
  return {
    userId: 'u-demo-01',
    balance: 15_000_000,
    preferences: {
      language: 'vi',
      notifications: {
        sms: true,
        push: true,
      },
    },
    statements: [
      {
        id: 'stmt-001',
        amount: -250_000,
        currency: 'VND',
        createdAt: '2026-11-20T09:30:00Z',
        note: 'Coffee shop payment',
        internalAuditCode: 'AUD-INT-9001',
      },
      {
        id: 'stmt-002',
        amount: 5_000_000,
        currency: 'VND',
        createdAt: '2026-11-21T14:15:00Z',
        note: 'Salary top-up',
        internalAuditCode: 'AUD-INT-9002',
      },
    ],
  };
}
