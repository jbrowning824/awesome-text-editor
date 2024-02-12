import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  function getStore(db, mode) {
    const transaction = db.transaction('jate', mode);
    return transaction.objectStore('jate');
  }

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const store = getStore(db, 'readwrite');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const store = getStore(db, 'readonly');
  const request = store.get(1);
  const result = await request;
  if (result) {
    console.log('Data retrieved from the database', result.value);
  } else {
    console.log('Data not found in the database');
  }
  return result?.value;
};

initdb();
