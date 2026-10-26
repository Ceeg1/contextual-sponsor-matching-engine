const { describe, it, expect } = require('vitest');
const { SafeSponsorUrlSchema } = require('../validation/sponsorUrlSchema');

describe('SafeSponsorUrlSchema', () => {
  it('allows valid https approved urls', () => {
    const result = SafeSponsorUrlSchema.safeParse('https://aldodetail.com/services');
    expect(result.success).toBe(true);
  });

  it('rejects javascript: xss payloads', () => {
    const result = SafeSponsorUrlSchema.safeParse('javascript:alert(1)');
    expect(result.success).toBe(false);
  });

  it('rejects raw IP addresses', () => {
    const result = SafeSponsorUrlSchema.safeParse('http://192.168.1.1/phish');
    expect(result.success).toBe(false);
  });
});
