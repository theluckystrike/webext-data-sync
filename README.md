# webext-data-sync

IndexedDB wrapper for Chrome extensions with CRUD operations, JSON export/import, and chrome.storage backup. Built for Manifest V3.

## Installation

```bash
npm i webext-data-sync
```

## Usage

```typescript
import { DataStore, DataExporter } from 'webext-data-sync';

// Create store instance
const store = new DataStore();

// Put (create or update) data
await store.put('notes', { id: '1', text: 'Hello World' });

// Get by ID
const note = await store.get<{ id: string; text: string }>('notes', '1');

// Get all items
const allNotes = await store.getAll<{ id: string; text: string }>('notes');

// Delete by ID
await store.delete('notes', '1');

// Count items
const count = await store.count('notes');

// Clear all data
await store.clear('notes');
```

## Export and Import

```typescript
const exporter = new DataExporter(store);

// Export to JSON string
const json = await exporter.exportJSON('notes');
console.log(json);

// Download as JSON file
await exporter.download('notes', 'notes-backup.json');

// Import from JSON string
const imported = await exporter.importJSON('notes', json);
console.log(`Imported ${imported} items`);
```

## Backup to chrome.storage

```typescript
// Backup IndexedDB data to chrome.storage
await exporter.backupToStorage('notes');

// Restore from chrome.storage backup
const restored = await exporter.restoreFromStorage('notes');
console.log(`Restored ${restored} items`);
```

## API Reference

### DataStore

`DataStore` provides an IndexedDB wrapper for Chrome extensions.

```typescript
new DataStore(dbName?: string, version?: number)
```

Parameters:
- `dbName` - Database name (default: 'ext_data')
- `version` - Database version (default: 1)

Methods:
- `put(storeName, data)` - Create or update an item
- `get(storeName, id)` - Get an item by ID
- `getAll(storeName)` - Get all items from a store
- `delete(storeName, id)` - Delete an item by ID
- `clear(storeName)` - Clear all items in a store
- `count(storeName)` - Count items in a store

### DataExporter

`DataExporter` handles JSON export/import and chrome.storage backup.

```typescript
new DataExporter(store: DataStore)
```

Methods:
- `exportJSON(storeName)` - Export store data as JSON string
- `download(storeName, filename?)` - Download data as JSON file
- `importJSON(storeName, json)` - Import data from JSON string
- `backupToStorage(storeName)` - Backup to chrome.storage
- `restoreFromStorage(storeName)` - Restore from chrome.storage backup

## Requirements

- TypeScript 5.3+
- Chrome Extensions API (for backup/restore features)

## License

MIT License - see LICENSE file for details.

## About

Maintained by theluckystrike. Built for modern Chrome extensions with a focus on simplicity and reliability.

For issues and contributions, visit the GitHub repository.
