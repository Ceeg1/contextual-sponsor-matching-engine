function selectSponsor(context, candidates, now = new Date()) {
  const activeCandidates = candidates.filter(s => {
    if (s.status !== 'APPROVED') return false;
    const start = new Date(s.startDate);
    const end = new Date(s.endDate);
    if (now < start || now > end) return false;
    if (s.distance > (s.maxRadius || 5)) return false;
    return true;
  });

  if (activeCandidates.length === 0) {
    return { id: 'house-fallback', name: 'Community Housing Network', isFallback: true };
  }

  const tierWeight = { 'Platinum': 1, 'Gold': 2, 'Silver': 3 };

  activeCandidates.sort((a, b) => {
    const tierDiff = (tierWeight[a.tier] || 4) - (tierWeight[b.tier] || 4);
    if (tierDiff !== 0) return tierDiff;
    const distDiff = a.distance - b.distance;
    if (distDiff !== 0) return distDiff;
    const impDiff = a.impressions - b.impressions;
    if (impDiff !== 0) return impDiff;
    return a.id.localeCompare(b.id);
  });

  return activeCandidates[0];
}

module.exports = { selectSponsor };
