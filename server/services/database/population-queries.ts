const accountTableQuery: string =
  'CREATE TABLE IF NOT EXISTS Account(' +
  'accountId INTEGER PRIMARY KEY,' +
  'name TEXT NOT NULL);';

const categoryTableQuery: string =
  'CREATE TABLE IF NOT EXISTS Category(' +
  'categoryId INTEGER PRIMARY KEY,' +
  'name TEXT NOT NULL);';

const subcategoryTableQuery: string =
  'CREATE TABLE IF NOT EXISTS Subcategory(' +
  'subcategoryId INTEGER PRIMARY KEY,' +
  'name TEXT NOT NULL,' +
  'refCategory INTEGER NOT NULL,' +
  'FOREIGN KEY(refCategory) REFERENCES Category(categoryId));';

export const populationQueries: string[] = [
  accountTableQuery,
  categoryTableQuery,
  subcategoryTableQuery
];
