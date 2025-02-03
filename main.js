class IndexedDBManager {
  constructor(dbName, storeName, fields = []) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.fields = fields;  // فیلدها به صورت آرایه‌ای از بیرون به کلاس داده می‌شوند
    this.db = null;
  }

  // باز کردن یا ایجاد پایگاه داده
  openDB(version = 1) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, version);

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          const objectStore = this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });

          // ایجاد ایندکس‌ها به صورت دینامیک
          this.fields.forEach(field => {
            objectStore.createIndex(field.name, field.name, { unique: field.unique || false });
          });
        } else {
          // اگر دیتابیس از قبل وجود دارد و نیاز به بروزرسانی داریم
          this._upgradeStore(event);
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve("Database opened successfully");
      };

      request.onerror = (event) => {
        reject("Error opening database");
      };
    });
  }

  // بروزرسانی ساختار دیتابیس و افزودن فیلد یا ایندکس جدید
  _upgradeStore(event) {
    const db = event.target.result;
    const objectStore = db.transaction.objectStore(this.storeName);

    this.fields.forEach(field => {
      if (!objectStore.indexNames.contains(field.name)) {
        objectStore.createIndex(field.name, field.name, { unique: field.unique || false });
      }
    });
  }

  // افزودن داده به دیتابیس (Create)
  addItem(item) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.add(item);

      request.onsuccess = () => resolve("Item added successfully");
      request.onerror = () => reject("Error adding item");
    });
  }

  // دریافت همه داده‌ها از دیتابیس (Read)
  getAllItems() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.getAll();

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = () => reject("Error retrieving items");
    });
  }

  // جستجو بر اساس ایندکس (Read by index)
  getItemsByIndex(indexName, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = () => reject("Error retrieving items by index");
    });
  }

  // به‌روزرسانی داده (Update)
  updateItem(id, updatedItem) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(id);

      request.onsuccess = (event) => {
        const item = event.target.result;
        if (item) {
          // بروزرسانی مقادیر
          Object.assign(item, updatedItem);
          const updateRequest = objectStore.put(item);

          updateRequest.onsuccess = () => resolve("Item updated successfully");
          updateRequest.onerror = () => reject("Error updating item");
        } else {
          reject("Item not found for update");
        }
      };

      request.onerror = () => reject("Error retrieving item for update");
    });
  }

  // حذف داده (Delete)
  deleteItem(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(id);

      request.onsuccess = () => resolve("Item deleted successfully");
      request.onerror = () => reject("Error deleting item");
    });
  }
}
