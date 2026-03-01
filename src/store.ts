/**
 * Data Store — IndexedDB wrapper for extensions
 */
export class DataStore {
    private dbName: string; private version: number;

    constructor(dbName: string = 'ext_data', version: number = 1) { this.dbName = dbName; this.version = version; }

    private open(storeName: string): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onupgradeneeded = () => { const db = request.result; if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName, { keyPath: 'id' }); };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /** Put (create or update) */
    async put<T extends { id: string }>(storeName: string, data: T): Promise<void> {
        const db = await this.open(storeName);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite'); tx.objectStore(storeName).put(data);
            tx.oncomplete = () => { db.close(); resolve(); }; tx.onerror = () => reject(tx.error);
        });
    }

    /** Get by ID */
    async get<T>(storeName: string, id: string): Promise<T | undefined> {
        const db = await this.open(storeName);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly'); const req = tx.objectStore(storeName).get(id);
            req.onsuccess = () => { db.close(); resolve(req.result); }; req.onerror = () => reject(req.error);
        });
    }

    /** Get all items */
    async getAll<T>(storeName: string): Promise<T[]> {
        const db = await this.open(storeName);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly'); const req = tx.objectStore(storeName).getAll();
            req.onsuccess = () => { db.close(); resolve(req.result); }; req.onerror = () => reject(req.error);
        });
    }

    /** Delete by ID */
    async delete(storeName: string, id: string): Promise<void> {
        const db = await this.open(storeName);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite'); tx.objectStore(storeName).delete(id);
            tx.oncomplete = () => { db.close(); resolve(); }; tx.onerror = () => reject(tx.error);
        });
    }

    /** Clear all data in store */
    async clear(storeName: string): Promise<void> {
        const db = await this.open(storeName);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite'); tx.objectStore(storeName).clear();
            tx.oncomplete = () => { db.close(); resolve(); }; tx.onerror = () => reject(tx.error);
        });
    }

    /** Count items */
    async count(storeName: string): Promise<number> {
        const db = await this.open(storeName);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly'); const req = tx.objectStore(storeName).count();
            req.onsuccess = () => { db.close(); resolve(req.result); }; req.onerror = () => reject(req.error);
        });
    }
}
