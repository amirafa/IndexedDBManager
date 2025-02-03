# **IndexedDBManager Documentation**

## **Overview**
کلاس `IndexedDBManager` ابزاری برای مدیریت دیتابیس‌های `IndexedDB` در JavaScript است. این کلاس امکان انجام عملیات‌های پایه‌ای CRUD (Create, Read, Update, Delete) را فراهم می‌کند و از ایجاد و مدیریت ایندکس‌ها و فیلدها به صورت داینامیک پشتیبانی می‌کند. علاوه بر این، این کلاس به شما اجازه می‌دهد تا با استفاده از **نسخه‌بندی**، ساختار دیتابیس را به راحتی ارتقا دهید.

## **Constructor**
### `constructor(dbName, storeName, fields = [])`
- **شرح**: سازنده کلاس `IndexedDBManager` که دیتابیس را با نام داده شده ایجاد می‌کند.
- **ورودی‌ها**:
  - `dbName`: نام دیتابیس (نوع داده: `string`).
  - `storeName`: نام جدول (Object Store) که در دیتابیس ذخیره خواهد شد (نوع داده: `string`).
  - `fields`: آرایه‌ای از شیء‌ها که فیلدهای دیتابیس را مشخص می‌کند. هر شیء شامل ویژگی‌های `name` (نام فیلد) و `unique` (آیا فیلد منحصر به فرد است یا خیر) است. این پارامتر به صورت پیش‌فرض خالی است.
- **خروجی**: شیء‌ای از نوع `IndexedDBManager` ایجاد می‌کند.

### Example:
```javascript
const fields = [
  { name: "title", unique: false },
  { name: "author", unique: false },
  { name: "year", unique: false },
  { name: "publisher", unique: false }
];

const dbManager = new IndexedDBManager("LibraryDB", "books", fields);
```

## **Methods**

### `openDB(version = 1)`
- **شرح**: دیتابیس را با نسخه مشخص‌شده باز می‌کند یا در صورت نیاز آن را ایجاد می‌کند. اگر دیتابیس قبلاً وجود داشته باشد و نسخه جدیدی برای آن تعیین شده باشد، متد `onupgradeneeded` فراخوانی می‌شود.
- **ورودی‌ها**:
  - `version` (اختیاری): نسخه دیتابیس که به صورت پیش‌فرض برابر با 1 است.
- **خروجی**: یک `Promise` که اگر موفق باشد پیامی با متن "Database opened successfully" را برمی‌گرداند و در صورت بروز خطا، پیامی با متن "Error opening database" را ارائه می‌دهد.
  
### Example:
```javascript
dbManager.openDB(1)  // باز کردن دیتابیس با نسخه 1
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

### `addItem(item)`
- **شرح**: داده جدیدی را به دیتابیس اضافه می‌کند.
- **ورودی‌ها**:
  - `item`: شیء‌ای که می‌خواهید در دیتابیس ذخیره کنید. این شیء باید حاوی داده‌های مطابق با فیلدهای جدول باشد.
- **خروجی**: یک `Promise` که اگر موفق باشد پیامی با متن "Item added successfully" را برمی‌گرداند و در صورت بروز خطا، پیامی با متن "Error adding item" را ارائه می‌دهد.
  
### Example:
```javascript
const newBook = {
  title: "Clean Code",
  author: "Robert C. Martin",
  year: 2008,
  publisher: "Prentice Hall"
};

dbManager.addItem(newBook)
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

### `getAllItems()`
- **شرح**: تمام داده‌های موجود در دیتابیس را دریافت می‌کند.
- **ورودی‌ها**: ندارد.
- **خروجی**: یک `Promise` که اگر موفق باشد داده‌ها را به صورت آرایه‌ای از شیء‌ها برمی‌گرداند و در صورت بروز خطا، پیامی با متن "Error retrieving items" را ارائه می‌دهد.

### Example:
```javascript
dbManager.getAllItems()
  .then((items) => console.log(items))
  .catch((error) => console.error(error));
```

### `getItemsByIndex(indexName, value)`
- **شرح**: داده‌ها را بر اساس ایندکس جستجو می‌کند.
- **ورودی‌ها**:
  - `indexName`: نام ایندکس که می‌خواهید بر اساس آن جستجو کنید (نوع داده: `string`).
  - `value`: مقداری که می‌خواهید در ایندکس جستجو کنید (نوع داده: `any`).
- **خروجی**: یک `Promise` که اگر موفق باشد داده‌ها را به صورت آرایه‌ای از شیء‌ها برمی‌گرداند و در صورت بروز خطا، پیامی با متن "Error retrieving items by index" را ارائه می‌دهد.
  
### Example:
```javascript
dbManager.getItemsByIndex("publisher", "Prentice Hall")
  .then((items) => console.log(items))
  .catch((error) => console.error(error));
```

### `updateItem(id, updatedItem)`
- **شرح**: داده‌ای با شناسه مشخص را بروزرسانی می‌کند.
- **ورودی‌ها**:
  - `id`: شناسه داده‌ای که می‌خواهید آن را بروزرسانی کنید (نوع داده: `number`).
  - `updatedItem`: شیء‌ای که شامل داده‌های جدید است (نوع داده: `object`).
- **خروجی**: یک `Promise` که اگر موفق باشد پیامی با متن "Item updated successfully" را برمی‌گرداند و در صورت بروز خطا، پیامی با متن "Error updating item" را ارائه می‌دهد.
  
### Example:
```javascript
const updatedBook = {
  year: 2009
};

dbManager.updateItem(1, updatedBook)
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

### `deleteItem(id)`
- **شرح**: داده‌ای با شناسه مشخص را حذف می‌کند.
- **ورودی‌ها**:
  - `id`: شناسه داده‌ای که می‌خواهید آن را حذف کنید (نوع داده: `number`).
- **خروجی**: یک `Promise` که اگر موفق باشد پیامی با متن "Item deleted successfully" را برمی‌گرداند و در صورت بروز خطا، پیامی با متن "Error deleting item" را ارائه می‌دهد.
  
### Example:
```javascript
dbManager.deleteItem(1)
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

### `listIndexes()`
- **شرح**: ایندکس‌های موجود در جدول را برمی‌گرداند.
- **ورودی‌ها**: ندارد.
- **خروجی**: یک `Promise` که اگر موفق باشد آرایه‌ای از نام ایندکس‌ها را برمی‌گرداند و در صورت بروز خطا، پیامی با متن "No indexes found" را ارائه می‌دهد.

### Example:
```javascript
dbManager.listIndexes()
  .then((indexes) => console.log("Indexes:", indexes))
  .catch((error) => console.error(error));
```

### `checkFieldExists(fieldName)`
- **شرح**: بررسی می‌کند که آیا فیلد (ایندکس) مشخص در دیتابیس وجود دارد یا نه.
- **ورودی‌ها**:
  - `fieldName`: نام فیلدی که می‌خواهید بررسی کنید (نوع داده: `string`).
- **خروجی**: یک `Promise` که اگر فیلد وجود داشته باشد `true` را برمی‌گرداند و اگر وجود نداشته باشد `false` را برمی‌گرداند.
  
### Example:
```javascript
dbManager.checkFieldExists("publisher")
  .then((exists) => {
    if (exists) {
      console.log("Field exists");
    } else {
      console.log("Field does not exist");
    }
  })
  .catch((error) => console.error(error));
```

## **Summary**
کلاس `IndexedDBManager` ابزار مناسبی برای مدیریت و تعامل با دیتابیس‌های `IndexedDB` است. شما می‌توانید از آن برای انجام عملیات‌های CRUD، افزودن ایندکس‌ها، مدیریت ساختار دیتابیس، و انجام تغییرات ساختاری به صورت داینامیک استفاده کنید. این کلاس همچنین از نسخه‌بندی پشتیبانی می‌کند، بنابراین می‌توانید تغییرات در ساختار دیتابیس را به راحتی پیاده‌سازی کنید.

