# **IndexedDBManager Documentation**

## **Overview**
The `IndexedDBManager` class is a tool for managing `IndexedDB` databases in JavaScript. This class provides basic CRUD (Create, Read, Update, Delete) operations and supports dynamically creating and managing indexes and fields. Additionally, it allows you to easily upgrade the database structure using **versioning**.

## **Constructor**
### `constructor(dbName, storeName, fields = [])`
- **Description**: The constructor of the `IndexedDBManager` class, which creates a database with the provided name.
- **Parameters**:
  - `dbName`: The name of the database (data type: `string`).
  - `storeName`: The name of the object store in the database (data type: `string`).
  - `fields`: An array of objects that define the fields of the database. Each object contains `name` (the field name) and `unique` (whether the field is unique or not). This parameter is optional and defaults to an empty array.
- **Returns**: Creates an instance of the `IndexedDBManager` class.

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
- **Description**: Opens the database with the specified version, or creates it if necessary. If the database already exists and a new version is provided, the `onupgradeneeded` method will be triggered.
- **Parameters**:
  - `version` (optional): The database version, which defaults to 1.
- **Returns**: A `Promise` that, if successful, returns a message "Database opened successfully". If an error occurs, it returns "Error opening database".

### Example:
```javascript
dbManager.openDB(2)  // Opening the database with version 2
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

### `addItem(item)`
- **Description**: Adds a new item to the database.
- **Parameters**:
  - `item`: The object you want to store in the database. This object must contain data that corresponds to the table's fields.
- **Returns**: A `Promise` that, if successful, returns the message "Item added successfully". If an error occurs, it returns "Error adding item".

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
- **Description**: Retrieves all the items in the database.
- **Parameters**: None.
- **Returns**: A `Promise` that, if successful, returns the items as an array of objects. If an error occurs, it returns "Error retrieving items".

### Example:
```javascript
dbManager.getAllItems()
  .then((items) => console.log(items))
  .catch((error) => console.error(error));
```

### `getItemsByIndex(indexName, value)`
- **Description**: Searches for items based on an index.
- **Parameters**:
  - `indexName`: The name of the index you want to search by (data type: `string`).
  - `value`: The value you want to search for in the index (data type: `any`).
- **Returns**: A `Promise` that, if successful, returns the items as an array of objects. If an error occurs, it returns "Error retrieving items by index".

### Example:
```javascript
dbManager.getItemsByIndex("publisher", "Prentice Hall")
  .then((items) => console.log(items))
  .catch((error) => console.error(error));
```

### `updateItem(id, updatedItem)`
- **Description**: Updates an item with a specified ID.
- **Parameters**:
  - `id`: The ID of the item you want to update (data type: `number`).
  - `updatedItem`: The object containing the new data (data type: `object`).
- **Returns**: A `Promise` that, if successful, returns the message "Item updated successfully". If an error occurs, it returns "Error updating item".

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
- **Description**: Deletes an item with a specified ID.
- **Parameters**:
  - `id`: The ID of the item you want to delete (data type: `number`).
- **Returns**: A `Promise` that, if successful, returns the message "Item deleted successfully". If an error occurs, it returns "Error deleting item".

### Example:
```javascript
dbManager.deleteItem(1)
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

### `listIndexes()`
- **Description**: Retrieves the indexes in the object store.
- **Parameters**: None.
- **Returns**: A `Promise` that, if successful, returns an array of index names. If no indexes are found, it returns "No indexes found".

### Example:
```javascript
dbManager.listIndexes()
  .then((indexes) => console.log("Indexes:", indexes))
  .catch((error) => console.error(error));
```

### `checkFieldExists(fieldName)`
- **Description**: Checks whether a specific field (index) exists in the database.
- **Parameters**:
  - `fieldName`: The name of the field you want to check (data type: `string`).
- **Returns**: A `Promise` that returns `true` if the field exists, and `false` if it does not.

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
The `IndexedDBManager` class is a useful tool for managing and interacting with `IndexedDB` databases. You can use it for CRUD operations, adding indexes, managing the database schema, and making structural changes dynamically. This class also supports versioning, so you can easily implement changes to the database structure.

---

Let me know if you'd like further adjustments or additions!
