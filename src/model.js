export const platforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'X', 'LinkedIn', 'Threads'];
export function makeDraft({ title, caption = '', channels, assetId = null, sensitive = false }) {
  if (!title.trim()) throw new Error('Give your draft a title.');
  if (!channels?.length || channels.some(c => !platforms.includes(c))) throw new Error('Choose at least one supported destination.');
  return { id: crypto.randomUUID(), title: title.trim(), caption, channels, assetId, sensitive, status: 'review', createdAt: new Date().toISOString(), scheduledAt: null };
}
export function transition(draft, action, date, now = new Date()) {
  if (action === 'approve') {
    if (draft.status !== 'review') throw new Error('Only drafts awaiting review can be approved.');
    return { ...draft, status: 'approved' };
  }
  if (action === 'schedule') {
    if (draft.status !== 'approved') throw new Error('Approve this draft before scheduling.');
    if (!date || !Number.isFinite(new Date(date).getTime()) || new Date(date) <= now) throw new Error('Choose a future date and time.');
    return { ...draft, status: 'scheduled', scheduledAt: new Date(date).toISOString() };
  }
  if (action === 'revise') return { ...draft, status: 'review', scheduledAt: null };
  throw new Error('Unsupported action.');
}
export function auditEntry(draftId, action) {
  return { id: crypto.randomUUID(), draftId, action, actor: 'You', at: new Date().toISOString() };
}
export function exportData(state) { return JSON.stringify({ app: 'CreatorOS', version: 1, exportedAt: new Date().toISOString(), ...state }, null, 2); }
