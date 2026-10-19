const DB = 'creatoros-media';
async function database() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore('media', { keyPath: 'id' });
    r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error);
  });
}
export async function mediaOperation(mode, operation) {
  const db = await database();
  try { return await new Promise((resolve, reject) => {
    const tx = db.transaction('media', mode); const request = operation(tx.objectStore('media'));
    tx.oncomplete = () => resolve(request.result); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error || new Error('Media storage failed.'));
  }); } finally { db.close(); }
}
export const saveMedia = value => mediaOperation('readwrite', store => store.put(value));
export const readMedia = id => mediaOperation('readonly', store => store.get(id));
