import test from 'node:test';
import assert from 'node:assert/strict';
import { makeDraft, transition, exportData } from '../src/model.js';
const draft = () => makeDraft({ title: 'A great rally', channels: ['Instagram'], sensitive: true });
test('drafts including sensitive content require human approval', () => { const d = draft(); assert.equal(d.status, 'review'); assert.throws(() => transition(d, 'schedule', '2099-01-01'), /Approve/); });
test('only approved drafts can be scheduled, with a valid future time', () => { const d = transition(draft(), 'approve'); assert.throws(() => transition(d, 'schedule', 'invalid'), /future/); assert.throws(() => transition(d, 'schedule', '2000-01-01'), /future/); const s = transition(d, 'schedule', '2099-01-01'); assert.equal(s.status, 'scheduled'); assert.equal(transition(s, 'revise').scheduledAt, null); });
test('invalid destinations and empty titles rejected', () => { assert.throws(() => makeDraft({ title: '', channels: ['Instagram'] })); assert.throws(() => makeDraft({ title: 'test', channels: ['Unknown'] })); });
test('export preserves work and audit trail', () => { const d = draft(); const data = JSON.parse(exportData({ drafts: [d], audit: [{ action: 'approved' }] })); assert.equal(data.drafts[0].id, d.id); assert.equal(data.audit[0].action, 'approved'); });
