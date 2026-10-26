const { describe, it, expect } = require('vitest');
const { selectSponsor } = require('../lib/selectSponsor');

describe('selectSponsor', () => {
  const currentDate = new Date('2026-10-24');

  it('selects correct sponsor by tier and distance tie-breaker', () => {
    const candidates = [
      { id: 's1', name: 'Sponsor A', tier: 'Silver', distance: 0.4, impressions: 120, status: 'APPROVED', startDate: '2026-01-01', endDate: '2026-12-31', maxRadius: 5 },
      { id: 's2', name: 'Sponsor B', tier: 'Gold', distance: 1.2, impressions: 45, status: 'APPROVED', startDate: '2026-01-01', endDate: '2026-12-31', maxRadius: 5 },
      { id: 's3', name: 'Sponsor C', tier: 'Gold', distance: 0.8, impressions: 90, status: 'APPROVED', startDate: '2026-01-01', endDate: '2026-12-31', maxRadius: 5 },
      { id: 's4', name: 'Sponsor D', tier: 'Platinum', distance: 0.2, impressions: 10, status: 'PENDING', startDate: '2026-01-01', endDate: '2026-12-31', maxRadius: 5 },
    ];

    const selected = selectSponsor({}, candidates, currentDate);
    expect(selected.id).toBe('s3');
  });

  it('returns house fallback when no candidates match', () => {
    const selected = selectSponsor({}, [], currentDate);
    expect(selected.isFallback).toBe(true);
  });
});
