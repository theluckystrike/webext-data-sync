/**
 * Data Exporter — Export/import IndexedDB data as JSON
 */
import { DataStore } from './store';

export class DataExporter {
    private store: DataStore;
    constructor(store: DataStore) { this.store = store; }

    /** Export store to JSON string */
    async exportJSON(storeName: string): Promise<string> {
        const data = await this.store.getAll(storeName);
        return JSON.stringify(data, null, 2);
    }

    /** Download as JSON file */
    async download(storeName: string, filename?: string): Promise<void> {
        const json = await this.exportJSON(storeName);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = filename || `${storeName}.json`; a.click();
        URL.revokeObjectURL(url);
    }

    /** Import from JSON string */
    async importJSON<T extends { id: string }>(storeName: string, json: string): Promise<number> {
        const items = JSON.parse(json) as T[];
        for (const item of items) await this.store.put(storeName, item);
        return items.length;
    }

    /** Backup all to chrome.storage */
    async backupToStorage(storeName: string): Promise<void> {
        const data = await this.store.getAll(storeName);
        await chrome.storage.local.set({ [`backup_${storeName}`]: data });
    }

    /** Restore from chrome.storage backup */
    async restoreFromStorage<T extends { id: string }>(storeName: string): Promise<number> {
        const result = await chrome.storage.local.get(`backup_${storeName}`);
        const data = (result[`backup_${storeName}`] as T[]) || [];
        for (const item of data) await this.store.put(storeName, item);
        return data.length;
    }
}
