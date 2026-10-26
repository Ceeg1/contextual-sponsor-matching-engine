const { z } = require('zod');

const APPROVED_DOMAINS = ['aldodetail.com', 'communitypartner.org', 'calstatela.edu'];

const SafeSponsorUrlSchema = z.string().url().superRefine((url, ctx) => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      ctx.addIssue({ code: 'custom', message: 'Security Constraint: Only HTTPS URLs are permitted.' });
    }
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(parsed.hostname)) {
      ctx.addIssue({ code: 'custom', message: 'Security Constraint: Direct IP addresses are prohibited.' });
    }
    const isAllowed = APPROVED_DOMAINS.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
    if (!isAllowed) {
      ctx.addIssue({ code: 'custom', message: 'Security Constraint: Domain not in approved sponsor registry.' });
    }
  } catch {
    ctx.addIssue({ code: 'custom', message: 'Malformed URL syntax.' });
  }
});

module.exports = { SafeSponsorUrlSchema };
