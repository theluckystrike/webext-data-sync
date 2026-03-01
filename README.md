# webext-data-sync — IndexedDB Data Store for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i webext-data-sync`

IndexedDB wrapper with CRUD, JSON export/import, and chrome.storage backup.

```typescript
import { DataStore, DataExporter } from 'webext-data-sync';
const store = new DataStore();
await store.put('notes', { id: '1', text: 'Hello' });
```
MIT License
